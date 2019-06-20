/*
Disposition of controllers:
 K1  K2      PAD13  PAD14  PAD15  PAD16
 K3  K4      PAD9   PAD10  PAD11  PAD12
 K5  K6      PAD5   PAD6   PAD7   PAD8
             PAD1   PAD2   PAD3   PAD4
             
On PROG 1:
==========
Pads PAD1 -> PAD16: {
 command: 137 'note off' / 153 'note on',
 pad bank 1: 36 -> 51,
 velocity: 0 -> 127
}
Sliders K1 -> K6: {
 command: 176 'continuous controller',
    (bank1) (bank2) (bank3)
 K1:   3
 K2:   9
 K3:   12
 K4:   13
 ....
 velocity: 0 -> 127
}

*/

import { Controllers } from './Config.mjs';
import { Knob } from './Knob.mjs';
import { Pad } from './Pad.mjs';

// check WebMIDI
if( !navigator.requestMIDIAccess ) {
    console.error( 'This browser does not support WebMIDI.' );
}

export default class {
    /**
     * constructor
     * @param options Object
     * log: boolean, default: false
     * init: boolean, default: false
     * if not initialized on instanciation, call AkaiMPD218.init() is needed
     */
    constructor( params ) {
        if( params ) this.log = params.log || false;
        else this.log = false;
        this.initialized = false;
    }

    init() {
        return new Promise( ( resolve, reject ) => {
            // init WebMIDI
            if( !navigator.requestMIDIAccess ) {
                reject( new Error( 'This browser does not support WebMIDI.' ) );
            }

            navigator.requestMIDIAccess().then(
                // on requestMIDIAccess success:
                midiAccess => {
                    if( this.log ) console.log( { midiAccess } );

                    for( const input of midiAccess.inputs.values() ) {
                        if( input.name.includes( 'MPD218' ) ) {
                            Controllers.forEach( controller => {
                                const { name, note } = controller;
                                this[ name ] = name.includes( 'PAD' ) ?
                                    new Pad( name, note ) :
                                    new Knob( name, note );
                            } );

                            input.addEventListener( 'midimessage', midiMessage => {
                                if( this.log ) console.log( { midiMessage } );

                                const [ command, note, velocity ] = midiMessage.data;
                                if( this.log ) console.log( { note, command, velocity } );
                                
                                const controller = Controllers.find( c => c.note === Number( note ) );
                                if( controller ) this[ controller.name ].update( command, velocity );
                            } );

                            this.initialized = true;
                            resolve();
                        }
                    }

                    reject( new Error( 'MPD218 not found among your MIDI devices' ) );
                },

                // on requestMIDIAccess fail:
                e => {
                    console.log( { error: e } );
                    reject( new Error( 'Could not access your MIDI devices.' ) );
                }
            );
        } );
    }
}