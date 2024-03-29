import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IMovieEdit } from "../../shared/types/movie.types";
import { getMovieById, updateMovie } from "../../services/movies.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ErrorContainer, ErrorMessage, Form, Input, Label, SubmitButton } from "../../ui/StyledForm";


const MovieEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState } = useForm<IMovieEdit>({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieById(id);
        Object.keys(movieData).forEach((key) =>
          setValue(key as keyof IMovieEdit, movieData[key])
        );
      } catch (error) {
        console.error("Ошибка при загрузке данных фильма", error);
        setError("Ошибка при загрузке данных фильма");
      }
    };

    fetchMovieData();
  }, [id, setValue]);

  const onSubmit = async (data: IMovieEdit) => {
    try {
      await updateMovie(id, data);
      navigate("/table");
    } catch (error) {
      console.error("Ошибка при обновлении данных фильма", error);
      setError(`Ошибка при обновлении данных фильма`);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Название фильма:
        <Input
          {...register("title", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 3,
              message: "Минимальная длина 3 символа",
            },
          })}
        />
        <ErrorMessage>{formState.errors.title?.message}</ErrorMessage>
      </Label>
      <Label>
        Год выпуска:
        <Input
          {...register("year", {
            required: "Поле обязательно для заполнения",
            min: {
              value: 1900,
              message: "Введите корректный год",
            },
          })}
          type="number"
        />
        <ErrorMessage>{formState.errors.year?.message}</ErrorMessage>
      </Label>
      <SubmitButton type="submit" disabled={!formState.isValid}>
        Сохранить изменения
      </SubmitButton>
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </Form>
  );
};

export default MovieEdit;
