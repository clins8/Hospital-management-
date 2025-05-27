const form = document.getElementById('patientForm');
const patientList = document.getElementById('patientList');

let patients = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const illness = document.getElementById('illness').value.trim();
  const doctor = document.getElementById('doctor').value.trim();
  const appointment = document.getElementById('appointment').value;

  const patient = {
    id: Date.now(),
    name,
    age,
    illness,
    doctor,
    appointment
  };

  patients.push(patient);
  renderPatients();
  form.reset();
});

function renderPatients() {
  patientList.innerHTML = '';

  if (patients.length === 0) {
    patientList.innerHTML = '<p>No patients registered yet.</p>';
    return;
  }

  patients.forEach(patient => {
    const card = document.createElement('div');
    card.className = 'patient-card';

    const details = document.createElement('div');
    details.className = 'patient-details';
    details.innerHTML = `
      <span><strong>Name:</strong> ${patient.name}</span>
      <span><strong>Age:</strong> ${patient.age}</span>
      <span><strong>Illness:</strong> ${patient.illness}</span>
      <span><strong>Doctor:</strong> ${patient.doctor}</span>
      <span><strong>Appointment:</strong> ${new Date(patient.appointment).toLocaleString()}</span>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deletePatient(patient.id);

    card.appendChild(details);
    card.appendChild(deleteBtn);

    patientList.appendChild(card);
  });
}

function deletePatient(id) {
  patients = patients.filter(patient => patient.id !== id);
  renderPatients();
}
