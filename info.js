import mysql from 'mysql2'

const pool = mysql.createPool({

    host: "localhost",
    user: "root",
    password: "",
    database: "employees"

    // host: 'sql12.freesqldatabase.com',
    // port: 3306,
    // user: 'sql12763292',
    // password: 'tyvfHRcTGP',
    // database: 'sql12763292'

}).promise()

export const check = async (e_No) => {
    const [check] = await pool.query(`SELECT COUNT(*) AS rs FROM employees 
    WHERE e_No = ${e_No}`)
    var checking = 0
    if (check[0].rs >= 1) {
        checking = 0
    } else {
        checking = 1
    }
    return {
        checking
    }
}

export const changePasswor = async (number, password, newPassword) => {
    var message
    var [old] = await pool.query(`SELECT * FROM employees WHERE e_No = ${number} AND BLOCK = 0`)
    console.log(old[0].password)
    old[0].password == password
        ?
        await pool.query(`UPDATE employees SET password = '${newPassword}' WHERE e_No = ${number}`)
        :
        message = "Uncurrect old password"
    return message;
}

export const insertEmployee = async (e_No, e_Name, AName, position, shift, gender) => {
    var data = []
    await pool.query(`INSERT INTO employees (e_No, name, AName, position, shift_number, gender)
    VALUES (${e_No}, '${e_Name}', '${AName}', '${position}', ${shift}, '${gender}');`)
    data.push(
        {
            "Message": "Employee added successfully"
        }
    )
    return data
}

export const getEmployee = async (ID) => {
    var sql = `SELECT * FROM employees WHERE ID = ${ID} AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    employee.length < 1 ?
        data.push(
            {
                "Message:": "This employee has deleted!"
            }
        )
        :
        data.push(
            {
                "e_No": employee[0].e_No,
                "name": employee[0].name,
                "position": employee[0].position,
                "shift_number": employee[0].shift_number,
                "gender": employee[0].gender
            }
        )
    return data
}

export const getEmployeeByName = async (name) => {
    var sql = `SELECT * FROM employees WHERE name = '${name}' AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    employee.length == 0 ?
        data.push(
            {
                "Message:": "No employee found"
            }
        )
        :
        data.push(
            {
                "e_No": employee[0].e_No,
                "name": employee[0].name,
                "position": employee[0].position,
                "shift_number": employee[0].shift_number,
                "gender": employee[0].gender
            }
        )
    return data
}

export const getEmployeeByArabicName = async (name) => {
    var sql = `SELECT * FROM employees WHERE AName = '${name}' AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    employee.length == 0 ?
        data.push(
            {
                "Message:": "No employee found"
            }
        )
        :
        data.push(
            {
                "ID": employee[0].ID,
                "e_No": employee[0].e_No,
                "name": employee[0].name,
                "arabicName": employee[0].AName,
                "position": employee[0].position,
                "shift_number": employee[0].shift_number,
                "gender": employee[0].gender
            }
        )
    return data
}

export const getEmployees = async () => {
    var sql = `SELECT * FROM employees WHERE BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "ID": employee[i].ID,
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender,
                "checkID": employee[i].checkID
            }
        )
    }
    return data
}

export const getFrontEndEmployees = async () => {
    var sql = `SELECT * FROM employees WHERE (position = "Cashiar" OR position = "Customer service" OR position = "Supervisor") AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "ID": employee[i].ID,
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender,
                "checkID": employee[i].checkID
            }
        )
    }
    return data
}

export const getSalesEmployees = async () => {
    var sql = `SELECT * FROM employees WHERE (position = "Sales" OR position = "Sales supervisor") AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "ID": employee[i].ID,
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender,
                "checkID": employee[i].checkID
            }
        )
    }
    return data
}

export const getEmployeesByEmployeeNumber = async (number) => {
    var sql = `SELECT * FROM employees WHERE e_No = ${number} AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender,
                "checkID": employee[i].checkID
            }
        )
    }
    return data
}

export const getShiftEmployees = async shift => {
    var sql = `SELECT * FROM employees WHERE shift_number = ${shift} AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender
            }
        )
    }

    return data
}

export const getFrontEndEmployeesByShift = async shift => {
    var sql = `SELECT * FROM employees WHERE (position = "Cashiar" || position = "Customer service" || position = "Supervisor") AND shift_number = ${shift} AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender
            }
        )
    }

    return data
}

export const getSalesEmployeesByShift = async shift => {
    var sql = `SELECT * FROM employees WHERE (position = "Sales" || position = "Sales supervisor") AND shift_number = ${shift} AND BLOCK = 0`
    var data = []
    var [employee] = await pool.query(sql)
    for (var i = 0; i < employee.length; i++) {
        data.push(
            {
                "e_No": employee[i].e_No,
                "name": employee[i].name,
                "arabicName": employee[i].AName,
                "position": employee[i].position,
                "shift_number": employee[i].shift_number,
                "gender": employee[i].gender
            }
        )
    }

    return data
}

export const deleteEmployee = async (e_No) => {
    var sql = `UPDATE employees SET BLOCK = 1 WHERE e_No = ${e_No}`
    await pool.query(sql)
}

export const returnEmployee = async (ID) => {
    var sql = `UPDATE employees SET BLOCK = 0 WHERE ID = ${ID}`
    await pool.query(sql)
}

export const changeEmployeePosition = async (e_No, newPosition) => {
    var sql = `UPDATE employees SET position = '${newPosition}' WHERE e_No = ${e_No}`
    await pool.query(sql)
}

const TimeDate = STime => {
    var today = new Date();
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    var time = {
        first1: ["( 8:45 ) am", "( 5:45 ) pm", "1st"],
        first2: ["( 9:45 ) am", "( 6:45 ) pm", "1st"],
        second: ["( 2:00 ) pm", "( 11:00 ) pm", "2nd"],
        third1: ["( 3:30 ) pm", "( 12:30 ) am", "3rd"],
        third2: ["( 4:30 ) pm", "( 1:30 ) am", "3rd"],
    }

    var from, to, shiftOrder

    switch (STime) {

        case "1": from = time.first1[0]; to = time.first1[1]; shiftOrder = time.first1[2];
            break;

        case "2": from = time.first2[0]; to = time.first2[1]; shiftOrder = time.first2[2]
            break;

        case "3": from = time.second[0]; to = time.second[1]; shiftOrder = time.second[2]
            break;

        case "4": from = time.third1[0]; to = time.third1[1]; shiftOrder = time.third1[2]
            break;

        case "5": from = time.third2[0]; to = time.third2[1]; shiftOrder = time.third2[2]
            break;
    }

    return {
        from,
        to,
        shiftOrder,
        today
    }
}

const TProccess = employees => {
    var
        PMen = [], PMC = 1,
        AMen = [], AMC = 1,
        OMen = [], OMC = 1,
        VMen = [], VMC = 1,

        PLadies = [], PLC = 1,
        ALadies = [],
        OLadies = [], OLC = 1,
        VLadies = [], VLC = 1,

        cashiersAbsent = [],

        absentCashierArabic = [],

        PCS = [], PCC = 1,
        ACS = [], ACC = 1,
        OCS = [], OCC = 1,
        VCS = [], VCC = 1,

        PSV = [], PSC = 1,
        ASV = [], ASC = 1,
        OSV = [], OSC = 1,
        VSV = [], VSC = 1;

    for (var i = 0; i < employees.length; i++) {
        if (employees[i].status == "P") {
            if (employees[i].position == "cashier") {
                switch (employees[i].gender) {

                    case "M":
                        PMen.push(PMC + "-" + employees[i].name + "\n");
                        PMC = PMC + 1;
                        break;

                    case "F":
                        PLadies.push(PLC + "-" + employees[i].name + "\n");
                        PLC = PLC + 1;
                        break;
                }
            } else if (employees[i].position == "cs") {
                PCS.push(PCC + "-" + employees[i].name + "\n");
                PCC = PCC + 1;
            } else if (employees[i].position == "sv") {
                PSV.push(PSC + "-" + employees[i].name + "\n");
                PSC = PSC + 1;
            }
        }

        else if (employees[i].status == "A") {
            if (employees[i].position == "cashier") {
                switch (employees[i].gender) {

                    case "M":
                        cashiersAbsent.push(AMC + "-" + employees[i].name + "\n");
                        // AMen.push(AMC + "-" + employees[i].name + "\n");
                        absentCashierArabic.push(AMC + "-" + employees[i].AName + "\n")
                        AMC = AMC + 1;
                        break;

                    case "F":
                        cashiersAbsent.push(AMC + "-" + employees[i].name + "\n");
                        // ALadies.push(AMC + "-" + employees[i].name + "\n");
                        absentCashierArabic.push(AMC + "-" + employees[i].AName + "\n")
                        AMC = AMC + 1;
                        break;
                }
            } else if (employees[i].position == "cs") {
                ACS.push(ACC + "-" + employees[i].name + "\n");
                absentCashierArabic.push(AMC + "-" + employees[i].AName + "\n")
                AMC = AMC + 1;
                ACC = ACC + 1;
            } else if (employees[i].position == "sv") {
                ASV.push(ASC + "-" + employees[i].name + "\n");
                absentCashierArabic.push(AMC + "-" + employees[i].AName + "\n")
                AMC = AMC + 1;
                ASC = ASC + 1;
            }
        }

        else if (employees[i].status == "O") {
            if (employees[i].position == "cashier") {
                switch (employees[i].gender) {

                    case "M":
                        OMen.push(OMC + "-" + employees[i].name + "\n");
                        OMC = OMC + 1;
                        break;

                    case "F":
                        OLadies.push(OLC + "-" + employees[i].name + "\n");
                        OLC = OLC + 1;
                        break;
                }
            } else if (employees[i].position == "cs") {
                OCS.push(OCC + "-" + employees[i].name + "\n");
                OCC = OCC + 1;
            } else if (employees[i].position == "sv") {
                OSV.push(OSC + "-" + employees[i].name + "\n");
                OSC = OSC + 1;
            }
        }

        else if (employees[i].status == "V") {
            if (employees[i].position == "cashier") {
                switch (employees[i].gender) {

                    case "M":
                        VMen.push(VMC + "-" + employees[i].name + "\n");
                        VMC = VMC + 1;
                        break;

                    case "F":
                        VLadies.push(VLC + "-" + employees[i].name + "\n");
                        VLC = VLC + 1;
                        break;
                }
            } else if (employees[i].position == "cs") {
                VCS.push(VCC + "-" + employees[i].name + "\n");
                VCC = VCC + 1;
            } else if (employees[i].position == "sv") {
                VSV.push(VSC + "-" + employees[i].name + "\n");
                VSC = VSC + 1;
            }
        }
    }
    return {
        PMen, AMen, OMen, VMen,
        PMC, AMC, OMC, VMC,
        cashiersAbsent,
        absentCashierArabic,
        PLadies, ALadies, OLadies, VLadies,
        PCS, ACS, OCS, VCS,
        PSV, ASV, OSV, VSV,
    }
}

const mensCash = employees => {
    var count, on, off, vacation

    TProccess(employees).PMen.length >= 1 ||
        TProccess(employees).AMen.length >= 1 ||
        TProccess(employees).OMen.length >= 1 ||
        TProccess(employees).VMen.length >= 1 ?
        count = `
# MENS CASHIERS ON DUTY
P           A             O       V     P.O
${TProccess(employees).PMen.length}           ${TProccess(employees).AMen.length}             ${TProccess(employees).OMen.length}       ${TProccess(employees).VMen.length}      0`
        : count = ""

    on = `
#MENS CASHIER ON DUTY
${TProccess(employees).PMen.length >= 1 ? TProccess(employees).PMen.join("") : "No one"}`

    off = `
#MENS CASHIER OFF DUTY
${TProccess(employees).OMen.length >= 1 ? TProccess(employees).OMen.join("") : "No one"}`

    TProccess(employees).VMen.length >= 1 ?

        vacation = `
#MENS CASHIER vacation
${TProccess(employees).VMen.length >= 1 ? TProccess(employees).VMen.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        vacation
    }
}

const ladiesCash = employees => {

    var count, on, off, vacation

    TProccess(employees).PLadies.length >= 1 ||
        TProccess(employees).ALadies.length >= 1 ||
        TProccess(employees).OLadies.length >= 1 ||
        TProccess(employees).VLadies.length >= 1 ?
        count = `
# LADIES CASHIERS ON DUTY 
P           A             O       V     P.O
${TProccess(employees).PLadies.length}           ${TProccess(employees).ALadies.length}             ${TProccess(employees).OLadies.length}       ${TProccess(employees).VLadies.length}      0`
        : count = ""

    on = `
#LADIES CASHIERS ON DUTY
${TProccess(employees).PLadies.length >= 1 ? TProccess(employees).PLadies.join("") : "No one"}`

    off = `
#LADIES CASHIERS OFF DUTY
${TProccess(employees).OLadies.length >= 1 ? TProccess(employees).OLadies.join("") : "No one"}`

    TProccess(employees).VLadies.length >= 1 ?

        vacation = `
#LADIES CASHIERS vacation
${TProccess(employees).VLadies.length >= 1 ? TProccess(employees).VLadies.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        vacation,

    }
}

const cashiersAbsent = employees => {
//${TProccess(employees).AMen.join("")}${TProccess(employees).ALadies.join("")}` :

    var details
    TProccess(employees).AMen.length >= 1 ||
        TProccess(employees).ALadies.length >= 1 ?
        details = `
# MENS & Ladies CASHIERS ABSENT
${TProccess(employees).cashiersAbsent.join("")}` :
        details = `
# MENS & Ladies CASHIERS ABSENT
No one
        `
    return details
}

const customerService = employees => {

    var count, on, off, absent, vacation

    TProccess(employees).PCS.length >= 1 ||
        TProccess(employees).ACS.length >= 1 ||
        TProccess(employees).OCS.length >= 1 ||
        TProccess(employees).VCS.length >= 1 ?
        count = `
    
#CUSTOMER SERVICE
P           A             O       V     P.O
${TProccess(employees).PCS.length}           ${TProccess(employees).ACS.length}             ${TProccess(employees).OCS.length}       ${TProccess(employees).VCS.length}      0`
        : count = ""

    on = `
#CUSTOMER SERVICE ON DUTY
${TProccess(employees).PCS.length >= 1 ? TProccess(employees).PCS.join("") : "No one"}`

    off = `
#CUSTOMER SERVICE OFF DUTY
${TProccess(employees).OCS.length >= 1 ? TProccess(employees).OCS.join("") : "No one"}`

    absent = `
# Customer service Absent *
${TProccess(employees).ACS.length >= 1 ? TProccess(employees).ACS.join("") : "No one"}`

    TProccess(employees).VCS.length >= 1 ?

        vacation = `
#CUSTOMER SERVICE vacation
${TProccess(employees).VCS.length >= 1 ? TProccess(employees).VCS.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        absent,
        vacation
    }
}

const supervisor = employees => {
    `
# CASHIERS SUPERVISOR
P         A         O       V         P.O
${TProccess(employees).PSV.length}       ${TProccess(employees).ASV.length}         ${TProccess(employees).OSV.length}       ${TProccess(employees).VSV.length}          0

# CASH SUPERVISOR ON DUTY
${TProccess(employees).PSV.join("")}


# CASH SUPERVISOR OFF DUTY
${TProccess(employees).OSV.join("")}

# Absent
${TProccess(employees).ASV.join("")}

# CASH SUPERVISOR vacation
${TProccess(employees).VSV.join("")}
    `
    ///////////////////////////////////////////////////
    var count, on, off, absent, vacation

    TProccess(employees).PSV.length >= 1 ||
        TProccess(employees).ASV.length >= 1 ||
        TProccess(employees).OSV.length >= 1 ||
        TProccess(employees).VSV.length >= 1 ?
        count = `
    
#CASHIERS SUPERVISOR
P           A             O       V     P.O
${TProccess(employees).PSV.length}           ${TProccess(employees).ASV.length}             ${TProccess(employees).OSV.length}       ${TProccess(employees).VSV.length}      0`
        : count = ""

    on = `
#CASH SUPERVISOR ON DUTY
${TProccess(employees).PSV.length >= 1 ? TProccess(employees).PSV.join("") : "No one"}`

    off = `
#CASH SUPERVISOR OFF DUTY
${TProccess(employees).OSV.length >= 1 ? TProccess(employees).OSV.join("") : "No one"}`

    absent = `
# Absent *
${TProccess(employees).ASV.length >= 1 ? TProccess(employees).ASV.join("") : "No one"}`

    TProccess(employees).VSV.length >= 1 ?

        vacation = `
#CASH SUPERVISOR vacation
${TProccess(employees).VSV.length >= 1 ? TProccess(employees).VSV.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        absent,
        vacation
    }

}

export const createTemplate = (employees, STime) => {


    var template =
        `
*STAFF ATTENDANCE DETAILS
Outlet 3817 date ${TimeDate(STime).today} *
${TimeDate(STime).shiftOrder} shift time from ${TimeDate(STime).from} to ${TimeDate(STime).to}
Total shift P = ${TProccess(employees).PMen.length + TProccess(employees).PLadies.length + TProccess(employees).PCS.length + TProccess(employees).PSV.length}
Total shift A = ${TProccess(employees).AMen.length + TProccess(employees).ALadies.length + TProccess(employees).ACS.length + TProccess(employees).ASV.length}
Total shift O = ${TProccess(employees).OMen.length + TProccess(employees).OLadies.length + TProccess(employees).OCS.length + TProccess(employees).OSV.length}
Total shift V = ${TProccess(employees).VMen.length + TProccess(employees).VLadies.length + TProccess(employees).VCS.length + TProccess(employees).VSV.length}
Total shift P.O = 0

${mensCash(employees).count}
${ladiesCash(employees).count}
${customerService(employees).count}
${supervisor(employees).count}
${mensCash(employees).on}
${mensCash(employees).off}
${mensCash(employees).vacation}
${ladiesCash(employees).on}
${ladiesCash(employees).off}
${ladiesCash(employees).vacation}
${cashiersAbsent(employees)}
${customerService(employees).on}
${customerService(employees).off}
${customerService(employees).absent}
${customerService(employees).vacation}
${supervisor(employees).on}
${supervisor(employees).off}
${supervisor(employees).absent}
${supervisor(employees).vacation}

*𝐀𝐭𝐭𝐞𝐧𝐝𝐚𝐜𝐞 𝐑𝐞𝐩𝐨𝐫𝐭  ( ${TimeDate(STime).shiftOrder == "1st" ? "Morning" : "Evening"} duty )  
    `

    return template
}


export const createArabicTemplate = (employees, STime) => {
    var details
    TProccess(employees).AMen.length >= 1 ||
        TProccess(employees).ALadies.length >= 1 ?
        details =

        `
الفترة/${TimeDate(STime).shiftOrder == "1st" ? "الصباح" : "المساء"}
التاريخ / ${TimeDate(STime).today}
الغياب/
${TProccess(employees).absentCashierArabic.join("")}
        `
        :
        details =
        `
الفترة/${TimeDate(STime).shiftOrder == "1st" ? "الصباح" : "المساء"}
التاريخ / ${TimeDate(STime).today}
الغياب/
لايوجد
        `

    return details
}

export const changeEmployeeShift = async (id, shift) => {
    var data = []
    var sql = `UPDATE employees SET shift_number = ${shift} WHERE e_No = ${id}`
    await pool.query(sql)
}

export const changeEmployeeNumber = async (oldNo, newNo) => {
    var data = []
    var sql = `UPDATE employees SET e_No = ${newNo} WHERE e_No = ${oldNo}`
    var [check] = await pool.query(`SELECT COUNT(e_No) AS quantati, e_No FROM employees WHERE e_No = ${newNo}`)
    check[0].quantati >= 1 ? data.push(`This employee number ${newNo} is already exists!`) :
        await pool.query(sql) + data.push(`The employee number ${oldNo} has changed to ${newNo}.`)
    return data
}

export const changeEmployeeNanme = async (e_No, newName, newAName) => {
    var data = []
    var sql = [
        `UPDATE employees SET name = '${newName}' WHERE e_No = ${e_No}`,
        `UPDATE employees SET AName = '${newAName}' WHERE e_No = ${e_No}`
    ]
    // type = "E" ? await pool.query(sql[0]) : await pool.query(sql[1])
    await pool.query(sql[0])
    await pool.query(sql[1])
    return data
}

export const order = () => {// 2 3 4 5 6 7 8 
    // var array = [10, 1, 1, 3, 7, 3, 13, 11, 2, 4]
    // var array = [11, 12, 8, 1, 17, 6, 10, 12, 8, 9, 12, 7, 5]
    var array = [2, 4, 11, 12, 17, 10, 3, 3, 4, 6, 2, 19, 11, 5, 7, 7]

    var max = 0
    var result = 0

    for (var i = 0; i < array.length; i++) {

        var current = array[i]

        for (var j = 0; j < array.length; j++) {

            if (current + 1 == array[j]) {
                current = array[j]
                j = 0
                result++
                console.log(result)
            }
        }
        if (result > max) {
            max = result
            result = 0
        }
    }

    return "'" + max + "'"
}



const TSProccess = employees => {
    var
        PDept = [], PDeptC = 1,
        ADept = [], ADeptC = 1,
        ODept = [], ODeptC = 1,
        VDept = [], VDeptC = 1,

        PFresh = [], PFreshC = 1,
        AFresh = [], AFreshC = 1,
        OFresh = [], OFreshC = 1,
        VFresh = [], VFreshC = 1,

        PSM = [], PSMC = 1,
        ASM = [], ASMC = 1,
        OSM = [], OSMC = 1,
        VSM = [], VSMC = 1,

        PSv = [], PSvC = 1,
        ASv = [], ASvC = 1,
        OSv = [], OSvC = 1,
        VSv = [], VSvC = 1,

        absentCounter = 1,
        absentCashierArabic = []

    for (var i = 0; i < employees.length; i++) {
        if (employees[i].status == "P") {
            if (employees[i].position == "Debartment") {
                PDept.push(PDeptC + "-" + employees[i].name + "\n");
                PDeptC = PDeptC + 1;
            } else if (employees[i].position == "Fresh food") {
                PFresh.push(PFreshC + "-" + employees[i].name + "\n");
                PFreshC = PFreshC + 1;
            } else if (employees[i].position == "Supermarket") {
                PSM.push(PSMC + "-" + employees[i].name + "\n");
                PSMC = PSMC + 1;
            } else if (employees[i].position == "Supervisor") {
                PSv.push(PSvC + "-" + employees[i].name + "\n");
                PSvC = PSvC + 1;
            }
        }
        else if (employees[i].status == "A") {
            if (employees[i].position == "Debartment") {
                ADept.push(absentCounter + "-" + employees[i].name + "\n");
                absentCashierArabic.push(absentCounter + "-" + employees[i].AName + "\n")
                absentCounter = absentCounter + 1
            } else if (employees[i].position == "Fresh food") {
                AFresh.push(absentCounter + "-" + employees[i].name + "\n");
                absentCashierArabic.push(absentCounter + "-" + employees[i].AName + "\n")
                absentCounter = absentCounter + 1
            } else if (employees[i].position == "Supermarket") {
                ASM.push(absentCounter + "-" + employees[i].name + "\n");
                absentCashierArabic.push(absentCounter + "-" + employees[i].AName + "\n")
                absentCounter = absentCounter + 1
            } else if (employees[i].position == "Supervisor") {
                ASv.push(absentCounter + "-" + employees[i].name + "\n");
                absentCashierArabic.push(absentCounter + "-" + employees[i].AName + "\n")
                absentCounter = absentCounter + 1
            }
        } else if (employees[i].status == "O") {
            if (employees[i].position == "Debartment") {
                ODept.push(ODeptC + "-" + employees[i].name + "\n");
                ODeptC = ODeptC + 1;
            } else if (employees[i].position == "Fresh food") {
                OFresh.push(OFreshC + "-" + employees[i].name + "\n");
                OFreshC = OFreshC + 1;
            } else if (employees[i].position == "Supermarket") {
                OSM.push(OSMC + "-" + employees[i].name + "\n");
                OSMC = OSMC + 1;
            } else if (employees[i].position == "Supervisor") {
                OSv.push(OSvC + "-" + employees[i].name + "\n");
                OSvC = OSvC + 1;
            }
        } else if (employees[i].status == "V") {
            if (employees[i].position == "Debartment") {
                VDept.push(VDeptC + "-" + employees[i].name + "\n");
                VDeptC = VDeptC + 1;
            } else if (employees[i].position == "Fresh food") {
                VFresh.push(VFreshC + "-" + employees[i].name + "\n");
                VFreshC = VFreshC + 1;
            } else if (employees[i].position == "Supermarket") {
                VSM.push(VSMC + "-" + employees[i].name + "\n");
                VSMC = VSMC + 1;
            } else if (employees[i].position == "Supervisor") {
                VSv.push(VSvC + "-" + employees[i].name + "\n");
                VSvC = VSvC + 1;
            }
        }
    }
    return {
        PDept, PDeptC, PSM, PSMC,
        ADept, ADeptC, ASM, ASMC,
        ODept, ODeptC, OSM, OSMC,
        VDept, VDeptC, VSM, VSMC,
        PFresh, PFreshC, PSv, PSvC,
        AFresh, AFreshC, ASv, ASvC,
        OFresh, OFreshC, OSv, OSvC,
        VFresh, VFreshC, VSv, VSvC,
        absentCashierArabic
    }
}


const Department = employees => {
    var count, on, off, vacation

    TSProccess(employees).PDept.length >= 1 ||
        TSProccess(employees).ADept.length >= 1 ||
        TSProccess(employees).ODept.length >= 1 ||
        TSProccess(employees).VDept.length >= 1 ?

        count = `
*Debartment STAFF*
P           A             O       V     P.O
${TSProccess(employees).PDept.length}           ${TSProccess(employees).ADept.length}             ${TSProccess(employees).ODept.length}       ${TSProccess(employees).VDept.length}      0`
        : count = ""

    on = `
*DEPARTMENT STAFF ON DUTY*
${TSProccess(employees).PDept.length >= 1 ? TSProccess(employees).PDept.join("") : "No one"}`

    off = `
*DEPARTMENT OFF DAY* 
${TSProccess(employees).ODept.length >= 1 ? TSProccess(employees).ODept.join("") : "No one"}`

    TSProccess(employees).VDept.length >= 1 ?

        vacation = `
*DEPARTMENT VACATION*
${TSProccess(employees).VDept.length >= 1 ? TSProccess(employees).VDept.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        vacation
    }
}


const FreshFood = employees => {
    var count, on, off, vacation

    TSProccess(employees).PFresh.length >= 1 ||
        TSProccess(employees).AFresh.length >= 1 ||
        TSProccess(employees).OFresh.length >= 1 ||
        TSProccess(employees).VFresh.length >= 1 ?



        count = `
*Fresh food STAFF*
P           A             O       V     P.O
${TSProccess(employees).PFresh.length}           ${TSProccess(employees).AFresh.length}             ${TSProccess(employees).OFresh.length}       ${TSProccess(employees).VFresh.length}      0`
        : count = ""

    on = `
*FRESH FOOD STAFF ON DUTY*
${TSProccess(employees).PFresh.length >= 1 ? TSProccess(employees).PFresh.join("") : "No one"}`

    off = `
*FRESH FOOD OFF DAY*
${TSProccess(employees).OFresh.length >= 1 ? TSProccess(employees).OFresh.join("") : "No one"}`

    TSProccess(employees).VFresh.length >= 1 ?

        vacation = `
*FRESH FOOD VACATION*
${TSProccess(employees).VFresh.length >= 1 ? TSProccess(employees).VFresh.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        vacation
    }
}

const Supermarket = employees => {
    var count, on, off, vacation

    TSProccess(employees).PSM.length >= 1 ||
        TSProccess(employees).ASM.length >= 1 ||
        TSProccess(employees).OSM.length >= 1 ||
        TSProccess(employees).VSM.length >= 1 ?



        count = `
*SUPERMARKET STAFF*
P           A             O       V     P.O
${TSProccess(employees).PSM.length}           ${TSProccess(employees).ASM.length}             ${TSProccess(employees).OSM.length}       ${TSProccess(employees).VSM.length}      0`
        : count = ""

    on = `
*SUPERMARKET STAFF ON DUTY*
${TSProccess(employees).PSM.length >= 1 ? TSProccess(employees).PSM.join("") : "No one"}`

    off = `
*SUPERMARKET OFF DOTY*
${TSProccess(employees).OSM.length >= 1 ? TSProccess(employees).OSM.join("") : "No one"}`

    TSProccess(employees).VSM.length >= 1 ?

        vacation = `
*SUPERMARKET VACATION*
${TSProccess(employees).VSM.length >= 1 ? TSProccess(employees).VSM.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        vacation
    }
}

const SalesSupervisor = employees => {
    var count, on, off, vacation

    TSProccess(employees).PSv.length >= 1 ||
        TSProccess(employees).ASv.length >= 1 ||
        TSProccess(employees).OSv.length >= 1 ||
        TSProccess(employees).VSv.length >= 1 ?



        count = `
*SALES SUPERVISOR*
P           A             O       V     P.O
${TSProccess(employees).PSv.length}           ${TSProccess(employees).ASv.length}             ${TSProccess(employees).OSv.length}       ${TSProccess(employees).VSv.length}      0`
        : count = ""

    on = `
*SUPERVISOR ON DUTY*
${TSProccess(employees).PSv.length >= 1 ? TSProccess(employees).PSv.join("") : "No one"}`

    off = `
*SUPERVISOR OFF DOTY*
${TSProccess(employees).OSv.length >= 1 ? TSProccess(employees).OSv.join("") : "No one"}`

    TSProccess(employees).VSv.length >= 1 ?

        vacation = `
*SUPERVISOR VACATION*
${TSProccess(employees).VSv.length >= 1 ? TSProccess(employees).VSv.join("") : "No one"}`
        : vacation = ""

    return {
        count,
        on,
        off,
        vacation
    }
}

const salesAbsent = employees => {

    var details
    TSProccess(employees).ADept.length >= 1 ||
        TSProccess(employees).AFresh.length >= 1 ||
        TSProccess(employees).ASM.length >= 1 ||
        TSProccess(employees).ASv.length >= 1
        ?
        details = `
*ABSENT*
${TSProccess(employees).ADept.join("")}
${TSProccess(employees).AFresh.join("")}
${TSProccess(employees).ASM.join("")}
${TSProccess(employees).ASv.join("")}
` :
        details = `
*ABSENT*
No one
        `

    const removeEmptyLines = str => str.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');

    return removeEmptyLines(details)
}

export const createSalesTemplate = async (employees, STime) => {

    var template =
        `
Outlet 3817 date ${TimeDate(STime).today} * 
${TimeDate(STime).shiftOrder} shift time from ${TimeDate(STime).from} to ${TimeDate(STime).to}
Total shift P = ${TSProccess(employees).PDept.length + TSProccess(employees).PFresh.length + TSProccess(employees).PSM.length + TSProccess(employees).PSv.length}
Total shift A = ${TSProccess(employees).ADept.length + TSProccess(employees).AFresh.length + TSProccess(employees).ASM.length + TSProccess(employees).ASv.length}
Total shift O = ${TSProccess(employees).ODept.length + TSProccess(employees).OFresh.length + TSProccess(employees).OSM.length + TSProccess(employees).OSv.length}
Total shift V = ${TSProccess(employees).VDept.length + TSProccess(employees).VFresh.length + TSProccess(employees).VSM.length + TSProccess(employees).VSv.length}
Total shift P.O = 0

${Department(employees).count}
${FreshFood(employees).count}
${Supermarket(employees).count}
${SalesSupervisor(employees).count}

${Department(employees).on}
${Department(employees).off}
${Department(employees).vacation}

${FreshFood(employees).on}
${FreshFood(employees).off}
${FreshFood(employees).vacation}

${Supermarket(employees).on}
${Supermarket(employees).off}
${Supermarket(employees).vacation}

${SalesSupervisor(employees).on}
${SalesSupervisor(employees).off}
${SalesSupervisor(employees).vacation}

${salesAbsent(employees)}
    `

    return template
}

export const createSalesArabicTemplate = (employees, STime) => {
    var details
    TSProccess(employees).ADept.length >= 1 ||
        TSProccess(employees).AFresh.length >= 1 ||
        TSProccess(employees).ASM.length >= 1 ?
        details =

        `
الفترة/${TimeDate(STime).shiftOrder == "1st" ? "الصباح" : "المساء"}
التاريخ / ${TimeDate(STime).today}
الغياب/
${TSProccess(employees).absentCashierArabic.join("")}
        `
        :
        details =
        `
الفترة/${TimeDate(STime).shiftOrder == "1st" ? "الصباح" : "المساء"}
التاريخ / ${TimeDate(STime).today}
الغياب/
لايوجد
        `

    return details
}