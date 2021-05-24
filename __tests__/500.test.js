it('calls console.log with "hello"', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  
  console.log('Skipped  this test to make github skip it');
  
  expect(consoleSpy).toHaveBeenCalledWith('Skipped  this test to make github skip it');
});