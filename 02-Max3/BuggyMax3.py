# File: BuggyMax3.py

"""The file implements a buggy version of the max3 function."""

def max3(a, b, c):
    """Returns the largest of the three arguments a, b, and c."""
    if a > b and a > c:
        return a
    if b > a and b > c:
        return b
    if c > a and c > b:
        return c

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
