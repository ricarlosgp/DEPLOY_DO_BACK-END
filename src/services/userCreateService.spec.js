/*
it("result of them sum of 2 + 2 must be 4", () => {
    const a = 2;
    const b = 2;
    const result = a + b;

    expect(result).toEqual(5); //espero ou expect para que a const result seja igual ou toEqual a 5 
});

//obs: para iniciar o teste precisamos digitar no terminal o comando npx jest --init e em seguida o comando npm test
*/
const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

it("user should be create", async () => {
    const user = {
        name: "User Test",
        email: "user@test.com",
        password: "123"
    };

    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");

});