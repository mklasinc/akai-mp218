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

const knobsList = [
    {
        name: 'K1',
        note: 3
    },
    {
        name: 'K2',
        note: 9
    },
    {
        name: 'K3',
        note: 12
    },
    {
        name: 'K4',
        note: 13
    }
];

const createPadsList = () => new Array( 16 )
    .fill( 0 )
    .map( ( n, index ) => ( {
        name: `PAD${ index + 1 }`,
        note: 36 + index
    } ) );

export const Controllers = knobsList.concat( createPadsList() );