
export default function AccesoDenegado() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded p-4 text-center bg-light shadow" style={{ maxWidth: "400px" }}>
        <h2 className="text-danger mb-3">Acceso denegado</h2>
        <p>No tienes permisos para esta sección.</p>
      </div>
    </div>
  );
}
