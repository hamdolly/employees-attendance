import express from 'express';
import * as info from "./info.js"
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.get('/', async (req, res) => {
    res.send("Hello world war Z!");

})

app.patch('/password', async (req, res) => {
    try {
        var data = req.body
        await info.changePasswor(data[0].e_No, data[0].password, data[0].newPassword)
        res.status(200).send([{ message: "Password changed successfuly", success: 1 }])
    } catch (error) {
        res.status(500).send([{ message: `${error.message}`, success: 0 }])
    }
})

app.post('/employee', async (req, res) => {
    try {
        var data = req.body
        if (await (await info.check(data.e_No)).checking == 1) {
            info.insertEmployee(data.e_No, data.e_Name, data.AName, data.position, data.shift, data.gender)
            res.status(200).send([{ message: "The user added succssfuly.", success: 1 }])
        } else {
            res.status(400).send([{ message: "This employee is arrdy exitsst!", success: 0 }])
        }
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`);
    }
})

app.post('/template', (req, res) => {
    try {
        var data = req.body
        res.status(200).send(info.createTemplate(data, data[0].shift))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`);
    }
})

app.post('/template/arabic', (req, res) => {
    try {
        var data = req.body
        res.status(200).send(info.createArabicTemplate(data, data[0].shift))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`);
    }
})

app.get('/employees/', async (req, res) => {
    try {
        res.status(200).send(await info.getEmployees())
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.get('/employee/number/:number', async (req, res) => {
    try {
        var { number } = req.params
        res.status(200).send(await info.getEmployeesByEmployeeNumber(number))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.get('/employees/shift/:shift', async (req, res) => {
    try {
        var { shift } = req.params
        res.status(200).send(await info.getShiftEmployees(shift))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.patch('/employee/shift', async (req, res) => {
    try {
        // var { id, shift } = req.params
        const data = req.body
        res.status(200).send(await info.changeEmployeeShift(data[0].id, data[0].shift))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.patch('/employee/id', async (req, res) => {
    try {
        const data = req.body
        res.status(200).send(await info.changeEmployeeNumber(data[0].old, data[0].new))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.patch('/employee/name', async (req, res) => {
    try {
        const data = req.body
        res.status(200).send(await info.changeEmployeeNanme(data[0].e_No, data[0].name, data[0].AName))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.get('/employee/ID/:id', async (req, res) => {
    try {
        var { id } = req.params
        res.status(200).send(await info.getEmployee(id))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.delete('/employee/number/:e_No', async (req, res) => {
    try {
        var { e_No } = req.params
        await info.deleteEmployee(`${e_No}`)
        res.status(200).send("The employee has been deleted!")
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.options('/employee/return/ID/:id', async (req, res) => {
    try {
        var { id } = req.params
        await info.returnEmployee(`${id}`)
        res.status(200).send("The employee is returned.")
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.get('/employee/name/:name', async (req, res) => {
    try {
        var { name } = req.params
        res.status(200).send(await info.getEmployeeByName(`${name}`))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.get('/employee/name/arabic/:name', async (req, res) => {
    try {
        var { name } = req.params
        res.status(200).send(await info.getEmployeeByArabicName(`${name}`))
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.get("/order/test", async (req, res) => {
    try {
        res.status(200).send(info.order())
    } catch (err) {
        res.status(500).send(`Message: ${err.message}`)
    }
})

app.listen(5000 || process.env.PORT, () => console.log("Started a port 5000"))
