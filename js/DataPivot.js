class DataPivot {
    constructor(label, raw) {
        this.label = label
        this.pivot = 0
        this.rawData = raw
        this.shortData = raw.slice(this.pivot, this.pivot + 10)
    }

    setPivot(start) {
        console.log(this.pivot);
        if(start === undefined || start < 0 || start > this.rawData.length) {
            console.error('Pivot is not availible');
            throw 'Pivot reaches end of data'
        } else {
            this.pivot = start
            this.shortData = this.rawData.slice(this.pivot, this.pivot + 10)
        }

        return this.pivot
        
    }



    
}