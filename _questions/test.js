/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
 var kidsWithCandies = function(candies, extraCandies) {
    // Find the maximum number of candies any kid currently has
    const maxCandies = Math.max(...candies);
  
    // For each kid, check if giving all extraCandies makes them have >= maxCandies
    return candies.map(candy => candy + extraCandies >= maxCandies);
  };
  
  // Example usage:
  console.log(kidsWithCandies([2, 3, 5, 1, 3], 3)); // [true, true, true, false, true]
  console.log(kidsWithCandies([4, 2, 1, 1, 2], 1)); // [true, false, false, false, false]
  console.log(kidsWithCandies([12, 1, 12], 10));    // [true, false, true]
  