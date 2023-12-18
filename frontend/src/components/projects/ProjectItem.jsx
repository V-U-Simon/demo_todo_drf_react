import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { DeleteProjectButton } from "./ProjectDeleteButton";
import { OpenModal } from "../shared/modal";
import { ProjectModalForm } from "./ProjectModalForm";
import { Link } from "react-router-dom";

ProjectItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export function ProjectItem({ project }) {
  return (
    <div className="card w-96 bg-neutral text-primary-content">
      <div className="p-3 text-right text-base-content text-sm">
        {/* <div className="badge badge-outline">created: {format(parseISO(project.created), "dd.MM.yyyy HH:mm")}</div> */}
        <div>created: {format(parseISO(project.created), "dd.MM.yyyy HH:mm")}</div>
        <div>updated: {format(parseISO(project.updated), "dd.MM.yyyy HH:mm")}</div>
      </div>
      <div className="card-body">
        <Link to={`${project.id}/tasks/`} className="card-title hover:text-primary">
          {project.title}
        </Link>
        <p>ID: {project.id}</p>
        <p>Active: {project?.isActive?.toString()}</p>
        <div className="card-actions justify-end flex flex-row">
          <OpenModal {...project}>update</OpenModal>
          <ProjectModalForm {...project} />
          <DeleteProjectButton {...project}>delete</DeleteProjectButton>
        </div>
      </div>
    </div>
  );
}
