

const add = (a, b) => a + b;
const greeting = (name) => `Hellow ${name}`;

test('should add two numbers', () => {
    const result = add(2,2);
expect(result).toBe(4)
});

test('should greet with name', () => {
    const name = greeting('omer');
    expect(name).toBe('Hellow omer');
});