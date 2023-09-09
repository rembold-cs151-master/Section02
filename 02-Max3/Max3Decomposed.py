# File: Max3Decomposed.py

"""The file implements the max3 function using max2 as a helper function."""

def max3(a, b, c):
    """Returns the largest of the three arguments a, b, and c."""
    return max2(a, max2(b, c))

def max2(a, b):
    """Returns the largest of the two arguments a and b."""
    if a > b:
        return a
    else:
        return b

# Test program 

def test_max3():
    assert max3(1, 2, 3) == 3
    assert max3(1, 3, 2) == 3
    assert max3(2, 1, 3) == 3
    assert max3(2, 3, 1) == 3
    assert max3(3, 2, 1) == 3
    assert max3(3, 1, 2) == 3
    assert max3(5, 5, 5) == 5

# Startup code

if __name__ == "__main__":
    test_max3()
