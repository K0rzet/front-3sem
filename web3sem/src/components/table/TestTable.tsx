import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { MovieService } from "../../services/movies.service";
import { IMovie, IGenre } from "../../shared/types/movie.types";
import styled from "styled-components";

interface MovieTableProps {}

const StyledButton = styled(Button)`
  &.ant-btn-default {
    background-color: rgba(255, 255, 255, 0);
    color: inherit;
    border: inherit 1px solid;
    border-radius: 5px;
    cursor: pointer;
  }
`

const StyledTable: typeof Table = styled(Table)`
  .ant-table-cell {
    color: inherit;
    background-color: inherit !important;
    border-color: inherit !important;
  }
  .ant-table-row {
    color: inherit;
    background-color: inherit !important;
    border-color: inherit !important;
  }
  .ant-table-wrapper {
    color: inherit;
    background-color: inherit;
    border-color: inherit;
  }
  .ant-table {
    color: inherit;
    background-color: inherit;
    border-color: inherit;
  }
  .ant-table-container {
    color: inherit;
    background-color: inherit;
    border-color: inherit;
  }
  .ant-table-thead {
    color: inherit;
    background-color: inherit;
    border-color: inherit;
  }
  .ant-btn {
    color: inherit;
    background-color: inherit;
    border-color: inherit;
  }
`;

const MovieTable: React.FC<MovieTableProps> = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Genres",
      dataIndex: "genres",
      key: "genres",
      render: (genres: IGenre[]) =>
        genres.map((genre) => genre.name).join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: IMovie) => (
        <Button onClick={() => handleDeleteMovie(record)} danger>
          Удалить
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await MovieService.getAll("", currentPage);
        if (currentPage > response.data.totalPages) {
          setCurrentPage(response.data.totalPages);
        } else {
          setMovies(response.data.movies);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDeleteMovie = async (movie: IMovie) => {
    Modal.confirm({
      title: "Удаление фильма",
      content: `Вы уверены, что хотите удалить фильм "${movie.title}"?`,
      okText: "Да",
      cancelText: "Отмена",
      onOk: async () => {
        try {
          setLoading(true);
          await MovieService.deleteMovie(movie._id);
          const response = await MovieService.getAll("", currentPage);
          if (currentPage > response.data.totalPages) {
            setCurrentPage(response.data.totalPages);
          } else {
            setMovies(response.data.movies);
            setTotalPages(response.data.totalPages);
          }
        } catch (error) {
          console.error("Error deleting movie:", error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages!) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
      <StyledTable
        dataSource={movies}
        columns={columns}
        pagination={false}
        rowKey="_id"
        loading={loading}
      />
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Предыдущая страница
        </StyledButton>
        <span style={{ margin: "0 8px" }}>{`Страница ${currentPage} из ${
          totalPages !== undefined ? totalPages : "-"
        }`}</span>
        <StyledButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          Следующая страница
        </StyledButton>
      </div>
    </>
  );
};

export default MovieTable;
