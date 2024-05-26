# HeartLab Coding Test - Writeup

## Instructions
- Ensure you have Node.js v16 or later installed.
- Install packages with `npm install`.
- To run the test watcher use `npm run test`.
- The recommended IDE is VS Code and Prettier as a code formatter.

## Architectural Summary & Justification

### Note: 
The provided solution handles example data plus an edge case where opening
 hours extend overnight such as from 10pm to 6am,

  ```sh
  {
    name: 'The Heart Team',
    openingHours: [
      'Mon-Fri 10pm to 6am'
    ],
  },
  ```

However, it does not address scenarios where there are multiple open hour 
periods within the same day.

  ```sh
  {
    name: 'The Heart Team',
    openingHours: [
      'Mon-Fri 10pm to 6am'
      'Tue-Thu 9am to 6pm'
    ],
  },
```

or open time includes minutes

  ```sh
  {
    name: 'The Heart Team',
    openingHours: [
      'Mon-Fri 8:30am to 5pm'
    ],
  },
  ```

The design aims to make the code easy to manage, reuse, and adapt by 
breaking it into smaller, specialised parts. This promotes clarity and 
efficiency, making the codebase easier to maintain and expand. 
By separating different tasks and using helper functions where needed, 
the code becomes more understandable and maintainable.

The provided code consists of two main functions: `parseClinicOpeningHours` and 
`getOpenClinics`, and helpers `formatHours` and `isInHoursRange`. These 
functions work together to parse clinic opening hours data and determine which 
clinics are open at a specified date and time.

### Main functions:

`parseClinicOpeningHours`: parses raw clinic opening hours data into a 
structured format. It iterates over each clinic in the input data and extracts 
opening hours for each day. The parsed data is organised by weekday and 
clinic name, with corresponding opening hour ranges. Uses a nested object 
structure to efficiently store and access opening hour information.

```sh
const clinicHours: ParsedClinicOpeningHours = {
  1: {
    "Clinic A": [9, 17],
    "Clinic B": [8, 15]
  },
  2: {
    "Clinic A": [9, 17],
    "Clinic C": [10, 18]
  },
  ...
};
```

`getOpenClinics`: This function determines which clinics are open at a 
specified date and time based on parsed opening hours data. It extracts the 
weekday and hour from the Luxon's DateTime object. It iterates over clinics for
the specified weekday and checks if the specified hour falls within each 
clinic's opening hours.

### Utils:

`formatHours`: A reusable utility that converts a given time in 12-hour string 
format to 24-hour number format by using Luxon's library.
Encapsulates the complexity of time parsing and conversion, 
increasing code readability and maintainability.

`isInHoursRange`: A reusable utility that checks if a given hour falls 
within a specified time range, handling cases where the hours range might 
be overnight.

### Justification: 

This modular approach promotes code readability, maintainability, and 
reusability.

The choice to represent parsed opening hours data as a nested object 
`ParsedClinicOpeningHours` provides an efficient data structure for storing and 
accessing clinic information. Nested objects allow for easy lookup of opening 
hours for specific weekdays and clinics.

By splitting the parsing logic into a separate function, the code becomes more 
adaptable to changes in data sources or formats.


## Scalability

The data structure used `ParsedClinicOpeningHours` efficiently organises 
clinic opening hours by weekday and clinic name, enabling quick access and 
lookup even with large datasets.

The codebase can scale effectively with the addition of new features or 
improvements due to the modular approach.

Breaking down tasks into smaller parts and using helper functions like 
`formatHours` and `isInHoursRange` make the code more flexible. 
It hides the details of how things work and allows 
us to use these functions in different parts of the code.

While it may require additional considerations for extreme 
scalability scenarios, its modular design creates a 
solid foundation for scalability in typical use cases.


## Further Work

### Identify more edge cases and adjust the code accordingly.
Overnight hours, multiple working hours periods at the same day, 
minutes in time etc.

### Input validation
Implement input validation to ensure that the input data matches to expected 
formats. 

### Error handling
Add error handling mechanisms to gracefully handle unexpected errors or edge 
cases.

### More tests
Develop comprehensive unit and integration tests to cover all functions and 
edge cases.

### Performance improvements
Identify potential performance bottlenecks and optimise critical sections 
of the code.