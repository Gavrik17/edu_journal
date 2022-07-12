const managmentDB = require('../../managmentDB')


class StudyRepository{
    constructor(){
        this.database = new managmentDB(process.env.DB_ACADEMIA)
    }

    async getSubName(CodSelectSub){
        return await this.database.request(`SELECT [NameSub]
                                            FROM dbo.SelectedSubs, dbo.Subs
                                            WHERE SelectedSubs.CodSelectSub = ${CodSelectSub} 
                                            AND SelectedSubs.CodSub = Subs.CodSub`)
    }
    async getStudents(CodSelectSub){
        return await this.database.request(`SELECT [FIO], [CodStudent]
                                            FROM dbo.Student, dbo.Person, dbo.SelectedSubs
                                            WHERE SelectedSubs.CodSelectSub = ${CodSelectSub} AND SelectedSubs.CodGroup = CodGrup 
                                            AND Student.CodPerson = Person.CodPerson AND CodStudStatus = 1
                                            ORDER BY FIO`)
    }

    async getScore(CodSelectSub){
        return await this.database.request(`SELECT Date, Score, StudentScore.CodStudent, FIO
                                            FROM dbo.StudentScore, dbo.Student, dbo.Person
                                            WHERE StudentScore.CodSelectSub = ${CodSelectSub} AND StudentScore.CodStudent = Student.CodStudent
                                            AND Student.CodPerson = Person.CodPerson
                                            ORDER BY Date, FIO
                                            `)
    }

    async getVisit(CodSelectSub){
        return await this.database.request(`SELECT Date, Visit, StudentVisit.CodStudent, FIO
                                            FROM dbo.StudentVisit, dbo.Student, dbo.Person
                                            WHERE StudentVisit.CodSelectSub = ${CodSelectSub} AND StudentVisit.CodStudent = Student.CodStudent
                                            AND Student.CodPerson = Person.CodPerson
                                            ORDER BY Date, FIO
                                            `)
    }

    async getNotes(CodSelectSub){
        return await this.database.request(`SELECT Date, Note
                                            FROM dbo.DateNotes
                                            WHERE CodSelectSub = ${CodSelectSub}
                                            ORDER BY Date
                                            `)
    }

    async addScore({CodSelectSub, CodStudent, Dates, Score}){
        return await this.database.request(`INSERT INTO dbo.StudentScore (CodSelectSub, CodStudent, Date, Score)
                                            VALUES (${CodSelectSub}, ${CodStudent}, convert(date, '${Dates}' ,103), ${Score})
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async addVisit({CodSelectSub, CodStudent, Dates, Visit}){
        return await this.database.request(`INSERT INTO dbo.StudentVisit (CodSelectSub, CodStudent, Date, Visit)
                                            VALUES (${CodSelectSub}, ${CodStudent}, convert(date, '${Dates}' ,103), '${Visit}')
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async addNote({CodSelectSub, Dates, Note}){
        return await this.database.request(`INSERT INTO dbo.DateNotes (CodSelectSub, Date, Note)
                                            VALUES (${CodSelectSub}, convert(date, '${Dates}' ,103), '${Note}')
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async updateScore({CodSelectSub, CodStudent, Dates, Score}){
        return await this.database.request(`UPDATE dbo.StudentScore
                                            SET Score = ${Score}
                                            WHERE CodSelectSub = ${CodSelectSub} AND CodStudent = ${CodStudent}
                                            AND Date = convert(date, '${Dates}' ,103)
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async updateVisit({CodSelectSub, CodStudent, Dates, Visit}){
        return await this.database.request(`UPDATE dbo.StudentVisit
                                            SET Visit = '${Visit}'
                                            WHERE CodSelectSub = ${CodSelectSub} AND CodStudent = ${CodStudent}
                                            AND Date = convert(date, '${Dates}' ,103)
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async updateNote({CodSelectSub, Dates, Note}){
        return await this.database.request(`UPDATE dbo.DateNotes
                                            SET Note = '${Note}'
                                            WHERE CodSelectSub = ${CodSelectSub}
                                            AND Date = convert(date, '${Dates}' ,103)
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }
}

module.exports = new StudyRepository