import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import inputVariants from "./common/Input";

const userSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
});

type FormData = {
  name: string;
  email: string;
};

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted");
    console.log(data);
    alert("success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        className={inputVariants({ error: !!errors.name })}
      />
      <div>
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
