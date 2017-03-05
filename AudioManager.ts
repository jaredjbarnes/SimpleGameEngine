class AudioManager {
    private _sounds: Map<string, HTMLAudioElement>;

    constructor(){
        this._sounds = new Map();
    }
    
    getAudio(path:string){
        var audio = new Audio(path);
        audio.autoplay = false;
        return audio;
    }

    playAudio(path:string, volume?: number, startTime?: number){
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

export = AudioManager;