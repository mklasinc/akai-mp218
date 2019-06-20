import { Controller } from './Controller.mjs';

export class Pad extends Controller {
    constructor( name, note ) {
        super( name, note );
        this.type = 'pad';

        // register noteOff / noteOn events
        this.registerEvent( 'noteOff' );
        this.registerEvent( 'noteOn' );
    }
    
    update( command, velocity ) {
        super.update( command, velocity );
        
        // dispatch events
        if( command === 137 ) this.dispatchEvent( 'noteOff', this.velocity );
        else if( command === 153 ) this.dispatchEvent( 'noteOn', this.velocity );
    }

    noteOff( callback ) {
        this.on( 'noteOff', callback );
    }

    noteOn( callback ) {
        this.on( 'noteOn', callback );
    }
}