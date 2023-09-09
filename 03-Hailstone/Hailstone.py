# File: Hailstone.py

"""
This module defines the hailstone function, which simulates the
calculation of the Hailstone sequence (also called the Collatz
sequence).  The inspiration for the particular form comes from
Douglas Hofstedter's Godel, Escher, Bach.
"""

def hailstone(n):
    """
    This function displays the Hailstone sequence for the parameter n.
    The steps in the Hailstone process are as follows:

      Start with a positive integer n.
      If n is even, divide it by two.
      If n is odd, multiply it by three and add one.
      Continue this process until n is equal to one.

    The question of whether this process always terminates remains unanswered.
    """
    steps = 0
    while n != 1:
        if n % 2 == 0:
            print(f"{n} is even, so I take half: {n // 2}")
            n = n // 2
        else:
            print(f"{n} is odd, so I make 3n+1: {3 * n + 1}")
            n = 3 * n + 1
        steps += 1
    print(f"The process took {steps} steps to reach 1.")

# Startup code

if __name__ == "__main__":
    hailstone(17)
