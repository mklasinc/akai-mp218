akai-mpd218
==========

![AKAI controller](https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRh7fVvUnaD6QuP7JXNwLEbZ7k9h9hNpKIEiwlwrm1qO2I4p-YODONAy32bn96S_MctZ6Yce3ae46V6pKwA7l46Q6IvQ464KZMF373MCHa9j7ekNS9qUkhX0g&usqp=CAc)
This is a forked version of [Makio135](http://makio135.com/) WEB MIDI interface for Akai's LPD8 Controller and adapted for Akai's MPD218 controller

### MPD218 features
- [MPD218 video review](https://www.youtube.com/watch?v=-X7p1fu8T3w)
```txt
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
    pad bank 2: 52 -> 67,
    pad bank 3: 68 -> 83,
    velocity: 0 -> 127
}
Sliders K1 -> K6: {
    command: 176 'continuous controller',
       (bank1) (bank2) (bank3)
    K1:   3   :  16   :  22 
    K2:   9   :  17   :  27
    K3:   12  :  18   :  28
    K4:   13  :  19   :  29
    ....
    velocity: 0 -> 127
}
```




![Akai LPD8](lpd8_web_large.jpg)
> The Akai LPD8 is a nice yet not too pricey USB MIDI controller, providing 8 pads and 8 knobs.

**akai-lpd8** is an npm package for using **Web MIDI** with such a MIDI controller offering a simple interface to access each pads and knobs:
```bash
npm i akai-lpd8
```

```js
const AkaiLPD8 = require('akai-lpd8')
// or include <script src="https://unpkg.com/akai-lpd8@1.0.1/"></script>

const LPD8 = new AkaiLPD8()

LPD8.init()
    .then(() => {
        console.log(LPD8)
        LPD8.K1.on('change', vel => console.log({vel}))
        LPD8.PAD5.noteOn(vel => console.log({vel}))
    })
    .catch(error => console.error({ error }))
```

Optionally, you can pass an object with a `log` property to get logs in the console
```js
const LPD8 = new AkaiLPD8({log: true})
```

Once initialized, we can access our controls using their names:
```js
console.log(LPD8.K1.type, LPD8.K2.command)
background(LPD8.K3.velocity, LPD8.PAD1.velocity, LPD8.PAD2.velocity)
```

And use events:
```js
LPD8.K4.on('change', velocity => console.log(velocity))
```
> Events callback are passed *velocity* as argument.

Valid events are:
- **change**: fired when a control sends a new message. (*for all controls*)
- **noteOn**: fired when a pad fires a *noteOn* message. (*for pads only*)
- **noteOff**: fired when a pad fires a *noteOff* message. (*for pads only*)

You can also use shorthands:
```js
LPD8.K5.change(velocity => console.log(velocity))
LPD8.PAD3.noteOn(velocity => console.log(velocity))
LPD8.PAD4.noteOff(velocity => console.log(velocity))
```
> `noteOn` and `noteOff` methods are **only available for pads**.


### Todo for use of multiple LPD8:
- AkaiLPD8 class should extend MIDIInput
- use of static method to find LPD8 devices
- constructor could take a MIDIInput as argument
