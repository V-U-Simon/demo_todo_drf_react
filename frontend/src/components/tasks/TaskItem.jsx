import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { DeleteTaskButton } from "./TaskDeleteButton";
import { OpenModal } from "../shared/modal";
import { TaskModalForm } from "./TaskModalForm";

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    project: PropTypes.number,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export function TaskItem({ task }) {
  return (
    <div className="card w-96 bg-neutral text-primary-content">
      <div className="p-3 text-right text-base-content text-sm">
        {/* <div className="badge badge-outline">created: {format(parseISO(task.created), "dd.MM.yyyy HH:mm")}</div> */}
        <div>created: {format(parseISO(task.created), "dd.MM.yyyy HH:mm")}</div>
        <div>updated: {format(parseISO(task.updated), "dd.MM.yyyy HH:mm")}</div>
      </div>
      <div className="card-body">
        <h1 className="card-title hover:text-primary">{task.title}</h1>
        <p>{task.description}</p>
        <p>ID: {task.id}</p>
        <p>Active: {task?.isActive?.toString()}</p>
        <div className="card-actions justify-end flex flex-row">
          <OpenModal {...task}>update</OpenModal>
          <TaskModalForm {...task} />
          <DeleteTaskButton {...task}>delete</DeleteTaskButton>
        </div>
      </div>
    </div>
  );
}
