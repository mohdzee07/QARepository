 const {test, expect, request} = require('@playwright/test');
  const {loginpayload} ={userEmail: "mehu1414@gmail.com", userPassword: "Mehu@123"}
  let token1;
test.beforeAll(async ()=>
{
    //1. create  a request context
      const apiContext= await request.newContext()
    //2.Call the post method
      const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginpayload
        })

    //Asserstions--to see of the reponse we got is 200
     await expect(loginResponse.ok()).toBeTruthy();
     //Ftech the token from the response
     const loginResponseJson= await loginResponse.json();
     const body= await loginResponse.body();
     const status = loginResponse.status()
     console.log(status);
     console.log(body);
     token1 = loginResponseJson.token;
     console.log(token);
})

test("EndtoEnd", async({page})=>
{

  await page.addInitScript(value=>{
 
    window.localStorage.setItem('token',value)
},value)
  

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //const productname ='ZARA COAT 3';
   // const products = await page.locator(".card-body ")
   
  



})