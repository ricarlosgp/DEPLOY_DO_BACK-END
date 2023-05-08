it("result of them sum of 2 + 2 must be 4", () => {
    const a = 2;
    const b = 2;
    const result = a + b;

    expect(result).toEqual(5); //espero ou expect para que a const result seja igual ou toEqual a 5 
});

//obs: para iniciar o teste precisamos digitar no terminal o comando npx jest --init e em seguida o comando npm test