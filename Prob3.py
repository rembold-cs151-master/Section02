# File: Prob3.py

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


# Startup code

if __name__ == "__main__":
    steps = hailstone(17)
    print(steps)
