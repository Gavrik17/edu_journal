class StudyDate{
    getTerm() {
        const date = new Date()
        if (date.getMonth() >= 7) {
            return 1
        }
        return 2
    }
    
    getCurrentYear() {
        const date = new Date()
        return date.getFullYear()
    }
    
    getYear() {
        return this.getTerm() == 1 ? this.getCurrentYear() + 1 : this.getCurrentYear()
    }

    getCourse(beginyear) {
        if (this.getTerm() == 2) {
            return this.getCurrentYear() - beginyear
        } else {
            return this.getCurrentYear() - beginyear + 1
        }
    }
}


module.exports = new StudyDate