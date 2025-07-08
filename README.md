# PillMate  ~  Meds on Time
<kbd> **Figure 1** <br><br>*Pill Mate Logo*<br><br> 
<img src="https://pfst.cf2.poecdn.net/base/image/72c08102fd5cc60eba87fc603061a443d76a22ec3b13ea76f6acbebeabbf6b35?w=1024&h=1536&pmaid=413996819" width="200" height="300" alt="PILMATELOGO">
</kbd>


## Introduction
This documentation outlines the Pill Dispenser project developed for the Robotics Summer Camp in collaboration with MASHORAH. The project aims to create an innovative solution that assists patients, particularly the elderly and those with motor impairments, in managing their medication schedules. By automating the dispensing of pills in real-time and providing timely notifications, this project seeks to improve medication adherence and overall health outcomes. Our goal is to design a user-friendly device that significantly reduces the risks associated with missed doses and enhances the quality of life for its users.<br><br>
## Table of Contents : 
1. [Introduction](#Introduction)
2. [About the Projet](#About-the-Project)
   - [Project Overview](#Project-Overview)
   - [Project Objectives](#Project-Objectives)
   - [Project Objectives](#Team-Members)
3. [Circuit](#Circuit)
   - [Circuit Components](#Circuit-Components)
   - [Circuit Wiring](#Circuit-Wiring)
   - [Code](#Arduino-Code)
4. [3D](#3D)   
5. [References](#References)
   
## About the Project
### Project Objectives
- Assist with medication timing.
- Support independent living among disabled patients.
- Reduce medication errors.
- Promote home-based healthcare.
### Team Members
1. Reema
2. Rawnaa
3. Ruba
4. Rowina
5. Sara
6. Ymam
# Circuit
This section details the circuit components and wiring used to make the project.
### Circuit Components
1. Esp32 wroom.
   It is the brain of the project, used for its many pins and wifi feature needed to connect to the ntp server to get real time.<br><br>
   <kbd> **Figure 3** <br><br>*Esp32*<br><br><img src="https://github.com/user-attachments/assets/452b2faa-62f7-4639-b80b-3a700c9cda8d" width="1000" height="3000" alt="PILMATELOGO">
   </kbd><br><br>

3. Stepper motor.
   <br><br>
   <kbd> **Figure 3** <br><br>*Stepper Motor*<br><br> <kbd>![stepM-ezgif com-webp-to-jpg-converter](https://github.com/user-attachments/assets/cdeb9826-5091-4be8-9f90-91447418cdf7)
</kbd></kbd><br><br>

4. Stepper motor driver
   <br><br>
   <kbd> **Figure 3** <br><br>*Stepper Motor*<br><br> <kbd>![ULN2003-Stepper-Motor-Driver-Pinout_535x-ezgif com-webp-to-jpg-converter](https://github.com/user-attachments/assets/4f1c96af-832f-496f-8079-515d9ce6ea33)

</kbd></kbd><br><br>
5. IR sensor.
<br><br>

 <kbd> **Figure 3** <br><br>*Stepper Motor*<br><br> <kbd>![ir-sensor-500x500-ezgif com-webp-to-jpg-converter](https://github.com/user-attachments/assets/c5300f87-5b94-4d20-93fc-1bc91f03d53d)
6. DFPlayer.
7. Speaker.
8. LCD Display.
9. I2C for lcd.

   
### Circuit Wiring

<br><br>
   <kbd> **Figure 3** <br><br>*Stepper Motor*<br><br> <kbd>![Pill-Dispenser-Team4](https://github.com/user-attachments/assets/d4ba096f-9fff-4b4d-855d-fd89e3034db1)</kbd>
    <kbd> **Figure 3** <br><br>*Stepper Motor*<br><br> <kbd> ![IMG_5710](https://github.com/user-attachments/assets/779206d7-b00e-44d3-b5ba-84a7c2699a39)
</kbd>

