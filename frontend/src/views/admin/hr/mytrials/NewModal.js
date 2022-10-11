import React from "react";
import "./NewModal.css";


function Modal({  closeModal }) {
	return (
			<div className='modalBackground'>
					<div className='modalContainer'>
						<div className='titleCloseBtn'>
							<button onClick={() => closeModal(false)}> X </button>
						</div>
							<div className='modalTitle'>
								<h1 className='Title'> Create New Staff </h1>
							</div>
							<div className='modalBody'>
								<p>First Name*</p>
								<input type ='text' name='firstname'/>
								<p>Last Name*</p>
								<input type ='text' name='lastname'/>
								<p>Sex*</p>
								<input type ='text' name='sex'/>
								<p>Date of Birth*</p>
								<input type ='text' name='date of birth'/>
								<p>State of Origin*</p>
								<input type ='text' name='state of origin'/>
								<p>Address*</p>
								<input type ='text' name='address'/>
								<p>Phone Number*</p>
								<input type ='number' name='phone number'/>
								<p>Email*</p>
								<input type ='email' name='email'/>
							</div>
							<div className='modalFooter'>
							<button id='cancelBtn' onClick={() => closeModal(false)}>
								 Cancel 
							</button>
								<button id='saveBtn'> Save </button>
							</div>
					</div>
			</div>
	);
}

export default Modal;