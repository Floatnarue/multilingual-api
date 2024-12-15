# h-lap-assignment

### Back-end Questions

1. Assuming the system currently has three microservices: Customer API, Master Data API,
   and Transaction Data API, there is a new feature that requires data from all three
   microservices to be displayed in near real-time. The current technology stack includes
   REST APIs and an RDBMS database. How would you design a new API for this feature?

Answer :

2. Assuming the team has started planning a new project, the project manager asks you for a
   performance test strategy plan for this release. How would you recommend proceeding to
   the project manager?

Answer :

### React Questions

1. useCallback ใช้ทําอะไร

answer : useCallback เป็น react hook ชนิดหนึ่งที่ใช้ในการ memorize callback function สาเหตุเพราะทุกครั้งที่ component มีการ re-render , callback function จะมีการสร้าง instance ใหม่ขึ้นมา เเทนที่จะใช้ instance เดิม ซึ่งอาจส่งผลต่อ performance ดังนั้นการใช้ useCallback จะช่วยให้ callback function ยังคงเป็น instance เดิม เว้นแต่ dependency จะเปลี่ยนเเปลง

2. Write a unit test for the UserProfile React component using Jest and React Testing
   Library.

answer :
