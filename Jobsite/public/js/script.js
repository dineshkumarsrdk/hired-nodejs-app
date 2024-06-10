// confirmation dialog for deletion
const deleteJobBtn = document.querySelector('#deleteJob');
deleteJobBtn.addEventListener('click', ()=>{
    window.confirm('Do you want to delete this job?');
});

// confirmation dialog for updation
const updateJobBtn = document.querySelector('#updateJobBtn');
updateJobBtn.addEventListener('click', ()=>{
    window.confirm('Do you want to update this job?');
});