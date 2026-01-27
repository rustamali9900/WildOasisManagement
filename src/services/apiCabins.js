import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) console.log("Cabins cannot be loaded");

  return data;
}

export async function CreateCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert(newCabin)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be created");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be deleted");
  }
  return data;
}
