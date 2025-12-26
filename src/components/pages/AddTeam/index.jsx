import AddTeamForm from "../../organisms/AddTeamForm";

export default function AddTeam() {
  return (
   <div className="w-full h-full p-8 bg-[var(--accent-light)]/60 flex flex-col gap-4 overflow-auto   items-center">
      <div className="w-[40vw] min-w-[420px]">
        <AddTeamForm />
      </div>
    </div>
  );
}
