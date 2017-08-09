export default class AudioManager {
    constructor(){
        this._sounds = new Map();
    }
    
    getAudio(path){
        var audio = new Audio(path);
        audio.autoplay = false;
        return audio;
    }

    playAudio(path, volume, startTime){
        var audio = this._sounds.get(path);

        if (audio == null){
            audio = new Audio(path);
            this._sounds.set(path, audio);
        }

        audio.autoplay = false;
        audio.currentTime = startTime || 0;
        audio.volume = volume || 1;
        audio.play();

    }
}