// note for modules import url
// <script type="module" src="./main.mjs?test=yo"></script>
// console.log( ( new URL( import.meta.url ) ).searchParams.get( 'test' ) );

import AkaiMPD218 from './src/AkaiMPD218.mjs';

const MPD218 = new AkaiMPD218( { log: true } );

MPD218.init()
    .then( () => {
        console.log( MPD218 );
        MPD218.K1.on( 'change', vel => console.log( { vel } ) );
        MPD218.PAD5.noteOn( vel => console.log( { vel } ) );
    } )
    .catch( error => console.error( { error } ) );