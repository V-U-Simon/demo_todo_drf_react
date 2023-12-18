import { useState } from "react";

export function ModalComponent(props) {
  return (
    <>
      <dialog id={props.id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">{props.children}</div>
        <form method="dialog" className="modal-backdrop ">
          <button>close by background</button>
        </form>
      </dialog>
    </>
  );
}

export function OpenModal(props) {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => document.getElementById(props.id).showModal()}>
        {props.children}
      </button>
    </>
  );
}
