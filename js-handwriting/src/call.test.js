require('./call');

describe('myCall', () => {
  test('should call function with correct context', () => {
    const obj = {
      value: 1
    };

    function testFn() {
      return this.value;
    }

    expect(testFn.myCall(obj)).toBe(1);
  });

  test('should pass arguments correctly', () => {
    const obj = {
      value: 1
    };

    function testFn(a, b) {
      return this.value + a + b;
    }

    expect(testFn.myCall(obj, 2, 3)).toBe(6);
  });

  test('should handle null context', () => {
    function testFn() {
      return this === global || this === window;
    }

    expect(testFn.myCall(null)).toBe(true);
  });
});
