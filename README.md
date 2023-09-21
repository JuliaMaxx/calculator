# Calculator
## Live Preview: https://juliamaxx.github.io/calculator/
### Description: pretty calculator with sound effect and three color themes and keyboard support
### Features: 
- calculator consists of `dsiplay` and `buttons` to make calculations on it
- `numeric` buttons
  - numbers `0-9`
  - `π` that is calculated as **3.14159**
  - `e` that is calculated as **2.71828**
  - **π** and **e** are treated **as numbers**, on click, their values are appended to the end of your input
- `two-value operators`:
  - addition `+`
  - subtraction `-`
  - division `÷`
  - multiplication `x`
  - power `^`
  - **two values** must be surrounding the operator
- `one-value operators`:
  - square root `√`
  - factorial `!` (up to 17)
  - percentage `%`
    -  if there is no other operator, divides current number by 100
      
    - if multiplication or division is current operator uses second number
    for percentage calculation
    
    - if addition or subtraction is current operator uses first number
    for percentage calculation, thus making calculation more convenient
    
    ##### Example:
    - 10 - 50% = 5, 50% of 10 is 5, 10 - 5 = 5
    - 10 * 20% = 2, 20% = 0.2, 0.2 * 10 = 2
  - sign changer `+/-` changes sign to the opposite one
  - logaritm base 10 `log`
  - natural logaritm `ln`
  - should be used **after** number has been inputed
  - perform operation **instantly** on currently inputed number
- `.` allows you to make calculations on `decimal point values`
- long decimal numbers are **rounded**
- calculation can be `finished` by:
  - pressing `=`
  - chaining another calculation by pressing any `two-value operators`
- clear or `C` wipes out both current number and a calculation
- `backspace` button allows to delete **one digit at a time** from currenty inputed number
- user `cannot`:
    - divide by 0
    - calculate **√**, **!**, **log** or **ln** of negative number
    - have two dots in a number
    - input/make calculations on numbers that are longer than **15** digits
- all the calculations are saved in `history`
    - history is opened with the corresponding button
    - history can be **cleared**
- calculator has `keyboard support`:
  - **numbers + - = ! % c . backspace and e** correspond to their keys
  - `/` for **÷**
  - `p` for **π**
  - `n` for **ln**
  - `l` for **log**
  - `r` for **√**
  - `h` for **history**
  - `^` for **power**
- calculator has `blue`, `pink` and `orange` color themes
- buttons on calculator can be `with or without sound` (changes by sound toggle button)
- website works well in both mobile and desktop versions
