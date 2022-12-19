// Unit testing
const axios = require("axios");
describe("Unit testing", () =>{
    test("Test Case#1: Checking that no student's age is equal to 60 in the database",async() =>{
        const posts = await axios.get("http://localhost:3000/students").then((res)=>res.data);
        const msg1 = posts.data[0].STU_AGE;
        const msg2 = posts.data[1].STU_AGE;
        const msg3 = posts.data[2].STU_AGE;
        const msg4 = posts.data[3].STU_AGE;
        const msg5 = posts.data[4].STU_AGE;
        var ans = [msg1,msg2,msg3,msg4,msg5];
        expect(ans).not.toEqual("60");
    });
    test("Test Case#2: Checking that the database table is not empty",async() =>{
        const posts = await axios.get("http://localhost:3000/students").then((res)=>res.data);
        expect(posts.data).not.toBeNull();
    });
})
// Integration testing
const express = require("express"),
app = express(),
router = require("../routes/studentServiceRoutes"),
request = require("supertest");
app.use(router);
describe("Integration testing", ()=>{
test("Test Case#3: Get all students' information in the database via /students", async () =>{
    const res = await request(app).get("/students");
    expect(res.body.data).toEqual([
    {
        STU_ID: 1,
        STU_FNAME: "Andrew",
        STU_LNAME: "Black",
        STU_AGE: 25,
    },
    {
        STU_ID: 2,
        STU_FNAME: "Alexandra",
        STU_LNAME: "Brown",
        STU_AGE: 25,
    },
    {
        STU_ID: 3,
        STU_FNAME: "Amanda",
        STU_LNAME: "Davidson",
        STU_AGE: 25,
    },
    {
        STU_ID: 4,
        STU_FNAME: "Benjamin",
        STU_LNAME: "Duncan",
        STU_AGE: 25,
    },
    {
        STU_ID: 5,
        STU_FNAME: "Christopher",
        STU_LNAME: "Ellison",
        STU_AGE: 25,
    },   
    ]);
});
test("Test Case#4: Get the information of the last student in the database via /student/:id", async () =>{
    const req = await request(app).get('/student/5');
    expect(req.body.data).toEqual(
    {   
        STU_ID: 5,
        STU_FNAME: "Christopher",
        STU_LNAME: "Ellison",
        STU_AGE: 25,
    });
});
});
// System testing
const puppeteer = require("puppeteer");
describe("System testing", ()=>{
test("Test Case#5: Test the web service by inserting a new student and retrieving his information from the database.", async () =>{
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ["--window-size=1920,1080"],
        executablePath:
        "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    });
    const page = await browser.newPage();
    await page.goto("http://localhost:3100/");
    await page.click("input#STU_ID");
    await page.type("input#STU_ID", "6388014");
    await page.click("input#STU_FNAME");
    await page.type("input#STU_FNAME", "Waris");
    await page.click("input#STU_LNAME");
    await page.type("input#STU_LNAME", "Damkham");
    await page.click("input#STU_AGE");
    await page.type("input#STU_AGE", "21");
    page.on("dialog", async dialog => {
        await dialog.accept();
    })
    await page.click("input#insert");
    await page.click("input#STU_ID");
    await page.type("input#STU_ID", "6388014");
    await page.click("input#select");
    const studentObject = await page.evaluate(() => {
    return {
        firstName: document.getElementById("STU_FNAME").value,
        lastName: document.getElementById("STU_LNAME").value,
        age: document.getElementById("STU_AGE").value,
    };
    });
    expect(studentObject).toEqual({
        firstName: "Waris",
        lastName: "Damkham",
        age: "21",
    });
},20000)
});