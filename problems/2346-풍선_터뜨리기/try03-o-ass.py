# 접근법은 똑같다.
import sys

input = sys.stdin.readline
from collections import deque

n = int(input())
inputs = input()

arr = list(map(int, inputs.split()))
d = deque()

for i in range(n):
  d.append((arr[i], i+ 1))

result = []

current, index = d.popleft()
result.append(index)

for i in range(n - 1):
  if current > 0:
    for j in range(current - 1):
      x = d.popleft()
      d.append(x)

  else:
    for j in range(-current):
      x = d.pop()
      d.appendleft(x)

  current, index = d.popleft()
  result.append(index)

for x in result:
  print(x, end=' ')
      
