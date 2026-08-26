import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>This path has not been planted.</h1><p>Return to the platform and choose a field signal to follow.</p><Link className="button button--lime" to="/"><LuArrowLeft /> Back home</Link></main>;
}
