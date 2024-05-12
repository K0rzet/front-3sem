import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { MovieService } from "../../services/movies.service";
import { IMovie, IGenre } from "../../shared/types/movie.types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { StyledButton } from "../../ui/AntdStyledButton";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MovieTableProps {}
type TPagination = "normal" | "dynamic";
const StyledTable: typeof Table = styled(Table)`
  .ant-table-cell {
    color: inherit !important;
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
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paginationType, setPaginationType] = useState<TPagination>("normal");
  const [showMoreButton, setShowMoreButton] = useState(false);

  const { ref, inView } = useInView();

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
      render: (genres: IGenre[]) => genres.map((genre) => genre.name).join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: IMovie) => (
        <Button.Group>
          <StyledButton
            onClick={() => {
              handleEditMovie(record);
            }}
          >
            Изменить
          </StyledButton>
          <StyledButton
            onClick={async () => {
              await handleDeleteMovie(record);
            }}
          >
            Удалить
          </StyledButton>
        </Button.Group>
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
          paginationType === "dynamic"
            ? setMovies((prevMovies) => [...prevMovies, ...response.data.movies])
            : setMovies(response.data.movies);

          setTotalPages(response.data.totalPages);

          setShowMoreButton(currentPage < response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);
  useEffect(() => {
    if (paginationType === "dynamic" && inView && currentPage < totalPages!) {
      setCurrentPage(currentPage + 1);
    }
  }, [inView]);

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

  const handleEditMovie = (movie: IMovie) => {
    navigate(`/movies/edit/${movie._id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <StyledTable
        data-testid="table"
        dataSource={movies}
        columns={columns}
        pagination={false}
        rowKey="_id"
        loading={loading}
      />
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        {/* Выбор типа пагинации */}
        <StyledButton
          onClick={() => {
            setPaginationType("normal");
          }}
          disabled={paginationType === "normal"}
        >
          Обычная пагинация
        </StyledButton>
        <StyledButton
          onClick={() => {
            setPaginationType("dynamic");
          }}
          disabled={paginationType === "dynamic"}
        >
          Динамическая пагинация
        </StyledButton>

        {paginationType === "normal" ? (
          /* Обычная пагинация */
          <>
            <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
              Предыдущая страница
            </StyledButton>
            <span style={{ margin: "0 8px" }}>{`Страница ${currentPage} из ${totalPages ?? "-"}`}</span>
            <StyledButton
              onClick={() => {
                handleNextPage();
              }}
              disabled={currentPage === totalPages}
              data-testid="forward-button"
            >
              Следующая страница
            </StyledButton>
          </>
        ) : (
          /* Динамическая пагинация */
          <>
            {showMoreButton && <StyledButton onClick={handleShowMore}>Показать еще</StyledButton>}
            <div ref={ref}>.</div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieTable;
