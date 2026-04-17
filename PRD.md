# [Project Name] [Required]
## Product Requirements Document

> **TRA460: Digital Health Implementation** | Chalmers University of Technology

> **v1.0 Section Guide:**
> - **[Required]** — Must be substantive for this submission to pass.
> - **[Recommended]** — Optional for v1.0, but strengthens your foundation.
> - **[Expand Later]** — Scaffolding for future iterations. Initial thoughts welcome.

---

### Project Details [Required]

| Field               | Value                                      |
|---------------------|--------------------------------------------|
| **Group**           | TRA460_Group_X                             |
| **Version**         | 1.0                                        |
| **Date**            | 2026-04-14                                |
| **Clinical Mentor** | Linda Wahlström Andersson, Ward Chief, Sahlgrenska                 |
| **Group Members**   | Abdi, Fawsi (Medical student); Alm, Emma (Industrial design engineering); Odinger, Gustav (Software engineering); Xie, Yanran (Computer Systems & Cybersecurity)     |

---

## 1. Needs Statement [Required]

<!--
  REQUIRED FOR v1.0

  THE CORE OF YOUR PRD.
  Use the Stanford Biodesign format below. Be specific:
  - The verb should describe a function, not a technology.
  - The population should be narrow enough to be actionable.
  - The outcome should be measurable or clearly observable.

  Weak:  "A way to use AI for patients that improves healthcare."
  Strong: "A way to detect early signs of atrial fibrillation
           in post-stroke patients managed in primary care
           that reduces time-to-treatment for recurrent events."
-->

> **A way to** [verb/action]
> **for** [specific population and/or clinical setting]
> **that** [desired outcome or value delivered].

---

### 1.1 Clinical Context & Background [Required]

<!--
  REQUIRED FOR v1.0

  Set the stage. What is the clinical problem space?
  - What condition, workflow, or care gap are you addressing?
  - How significant is this problem? (incidence, prevalence, burden)
  - Why does it matter — clinically, economically, or humanly?
-->When a patient is admitted to the ward, they usually enter through the waiting room and undergo preparation procedures such as X-rays, blood tests, and vital measurements.

Some procedures are performed outside the ward. However, even when patients are physically moved to another department, they remain digitally and administratively assigned to the original ward.

This creates a mismatch between:
- Physical patient location  
- Digital/system-recorded location  

In stressful or busy situations, staff may forget to update patient movement. As a result, patients may be physically located in one place but digitally recorded elsewhere, leading to inefficiencies, delays, and potential safety risks.

---
### 1.2 Key Clinical Insights [Required]

<!--
  REQUIRED FOR v1.0

  THIS IS THE MOST IMPORTANT SECTION FOR v1.0.
  Synthesize what you learned from your clinical mentor meeting(s).
  - What did you observe or hear?
  - What is the current workflow / status quo?
  - Where are the friction points, inefficiencies, or risks?
  - What surprised you?

  Ground this in specifics. Quotes, scenarios, and concrete
  examples are more valuable than generalizations.
-->
- There are multiple IT systems in use:
  - Elvis — financial and administrative system  
  - Melior — medical records system  
  - Orbit — surgical/operational system  

- Patient location follows a hierarchy:
  - Hospital → Ward → Room → Bed  

- Patients frequently move between:
  - Rooms and beds  
  - Surgery  
  - X-ray/CT  
  - ICU (general ICU and neuro ICU)  

- Beds are not reliable identifiers:
  - Patients may change beds  
  - Beds may move independently  

- Two major problems identified:
  - Systems are not integrated and do not communicate  
  - No real-time tracking of physical patient location  

- Current workaround:
  - Staff use shared Excel sheets to manually track:
    - Date  
    - Patient name  
    - Comments  
    - Operation date  

- Each patient has a QR-code bracelet containing:
  - Personal identification number  
  - Birth date  

- Privacy considerations:
  - Patients can choose to hide their identity  
  - Protected identity limits visibility of personal data  
  - Access to patient information varies across systems  

---

### 1.3 Existing Solutions & Gaps [Required]

<!--
  REQUIRED FOR v1.0

  What solutions or tools exist today for this problem?
  - Clinical tools, apps, devices, workflows
  - Why are they insufficient, inaccessible, or underused?
  - What gap remains that your project could fill?
-->
Existing solutions:
- Attempted system to replace Excel sheets (generic “one-size-fits-all” solution)  
- Cardiology ward uses heart monitors for patient tracking  

Limitations:
- Solutions are not tailored to specific ward needs  
- Lack of integration between systems  
- No real-time patient tracking capability  

Remaining gap:
- A simple, real-time, ward-specific solution for tracking patients’ physical location  

---

### 1.4 Success Metrics [Recommended]

<!--
  RECOMMENDED FOR v1.0

  How will you know your solution actually addresses the need?
  Think about the "that..." clause in your Needs Statement —
  how would you measure or observe that outcome?
-->
**Patient location efficiency**
- Average time to locate a patient < 30 seconds  
- 100% of patients found within 5 minutes (same building)  
- >90% of patients found within 15 minutes (different building)  

**Manual documentation reduction**
- Time spent logging patient location < 10 minutes per staff per day  
- Reduced time spent calling to locate patients  

---


## 2. Stakeholders & Users

### 2.1 Primary User(s) [Required]

<!--
   REQUIRED FOR v1.0

  Who will directly use or interact with your solution day-to-day?
  Be specific: "Cardiac nurses in outpatient clinics" not just "nurses."
-->
- Nurses (most frequent users, especially nights/weekends)  
- Secretaries & coordinators (frequent daytime users)  
- Doctors (less frequent users)  

---

### 2.2 Other Stakeholders [Required]

<!--
  REQUIRED FOR v1.0

  Who else is affected by or has influence over this solution?
  Consider: patients, caregivers, administrators, IT departments,
  payers/insurers, regulators, clinical champions, etc.
-->

- Receptionists (limited system access)  
- IT staff (system maintenance)  
- Patients (affected but no direct access)  
- Visitors / relatives  

---

### 2.3 User Journey — Current State [Recommended]

<!--
  RECOMMENDED FOR v1.0

  Describe the current care pathway or experience of your primary user.
  A simple narrative walkthrough is fine, e.g.:
  "The patient wakes up, measures their..., calls the clinic to..."
-->

- Patient is admitted to the ward  
- Undergoes preparation (tests, exams, etc.)  
- May be moved to another department (e.g., X-ray, ICU, surgery)  
- Movement is not always recorded in real-time  
- Staff must:
  - Check multiple systems (Melior, Elvis, Orbit)  
  - Use Excel sheets  
  - Call other departments  

Result:
- High cognitive load  
- Time-consuming process  
- Risk of incorrect or outdated information  

---

## 3. Solution Vision [Required]

<!--
  REQUIRED FOR v1.0

  1-2 paragraphs maximum. This is your "north star," not a feature list.
  - What is the high-level concept?
  - How does it directly address the Needs Statement?
  - What does success look like from the user's perspective?

  Keep it directional. You will refine this throughout the course.
-->

Hospital staff can always quickly and reliably know where their patients are, regardless of movement across departments.

The solution provides a simple and intuitive way to track patients’ real-time physical location, reducing reliance on manual documentation and fragmented systems.

From the user’s perspective, finding a patient becomes fast, effortless, and consistent, even during high workload situations.

---

## 4. Requirements

### 4.1 Functional Requirements (MoSCoW) [Recommended]

<!--
  RECOMMENDED FOR v1.0

  Categorize what your MVP needs to DO.
  Each requirement should be a clear, testable capability.
  A few items per category is enough for v1.0 — this section
  will grow significantly in later iterations.
-->

**Must Have** — *Non-negotiable for a functioning MVP*
- Patient name (or masked if protected identity)  
- Patient birth year  
- Notes field (customizable)  
- Latest patient location (e.g., X-ray, ICU)  
- Assigned room and bed  

**Should Have** — *High value, but the MVP could technically function without these*
- Upcoming operation date  
- Critical information (e.g., OBS column)  
- Responsible ward  

**Could Have** — *Nice-to-have if time and resources allow*
- Personal identification number (hashed/anonymized)  
- “Patient left behind” notifications  
- Integration with Melior / Elvis  
- Cause of admission  
- Location history log  
- More precise real-time tracking

**Won't Have** — *Explicitly out of scope for this project*
- Logging medical treatment details  
- Sharing information outside the ward  
- Unnecessary or excessive data 

### 4.2 Non-Functional Requirements & Constraints [Recommended]

<!--
  RECOMMENDED FOR v1.0

  Consider the "invisible" requirements:
  - Data privacy & security (GDPR, patient data handling)
  - Regulatory considerations (MDR, wellness vs. medical device)
  - Accessibility (WCAG, language/localization)
  - Interoperability standards (FHIR, HL7, openEHR)
  - Performance, offline capability
-->

- Fast and simple interaction:
  - Quick logging of patient movement  
  - Fast retrieval of location  

- Usability:
  - Intuitive interface  
  - Minimal training required  

- Privacy & security:
  - Compliance with patient confidentiality  
  - Support for protected identities  

- Interoperability (future consideration):
  - Potential integration with hospital systems

---

## 5. Technical Direction [Expand Later]

<!--
  EXPAND IN LATER ITERATIONS

  Initial thoughts only. No commitments required yet.
  This section helps your future self (and your AI agent, if using
  Claude Code) understand the technical landscape you are considering.
-->

- **Platform:** [iOS / Android / Web / Cross-platform / TBD]
- **Key Integrations:** [EHR systems, wearables, sensors, APIs, etc.]
- **Candidate Tech Stack:** [SpeziVibe, Swift/Kotlin, React, etc. / TBD]
- **Infrastructure:** [Cloud provider, on-premise, hybrid / TBD]

---

## 6. Open Questions & Risks [Required]

<!--
  REQUIRED FOR v1.0

  Be honest about what you don't know yet. This is a sign of
  rigorous thinking, not weakness.
  - What assumptions are you making that haven't been validated?
  - What could block or derail this project?
  - What do you need to ask your clinical mentor next?
-->

- **Bed vs patient location tracking:**  
  Plan: Conduct further interviews with clinical staff  

- **Need for precise real-time tracking:**  
  Plan: Validate with mentor and users  

- **Data privacy and security risks:**  
  Plan: Investigate GDPR and hospital policies  

- **System integration feasibility:**  
  Plan: Discuss with IT staff  

---

## Changelog [Required]

| Version | Date       | Summary of Changes                                  |
|---------|------------|-----------------------------------------------------|
| 1.0     | 2026-04-16 | Initial draft after first clinical mentor meeting   |
|         |            |                                                     |