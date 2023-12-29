import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { MovieService } from '../../services/movies.service';
import { IMovie, IGenre } from '../../shared/types/movie.types';

interface MovieTableProps {}

const MovieTable: React.FC<MovieTableProps> = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Genres',
      dataIndex: 'genres',
      key: 'genres',
      render: (genres: IGenre[]) => genres.map(genre => genre.name).join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
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
        const response = await MovieService.getAll('', currentPage);
        if (currentPage > response.data.totalPages) {
          setCurrentPage(response.data.totalPages);
        } else {
          setMovies(response.data.movies);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
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
      title: 'Удаление фильма',
      content: `Вы уверены, что хотите удалить фильм "${movie.title}"?`,
      okText: 'Да',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          setLoading(true);
          await MovieService.deleteMovie(movie._id);
          const response = await MovieService.getAll('', currentPage);
          if (currentPage > response.data.totalPages) {
            setCurrentPage(response.data.totalPages);
          } else {
            setMovies(response.data.movies);
            setTotalPages(response.data.totalPages);
          }
        } catch (error) {
          console.error('Error deleting movie:', error);
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
      <Table dataSource={movies} columns={columns} pagination={false} rowKey="_id" loading={loading} />
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Предыдущая страница
        </Button>
        <span style={{ margin: '0 8px' }}>{`Страница ${currentPage} из ${totalPages !== undefined ? totalPages : '-'}`}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Следующая страница
        </Button>
      </div>
    </>
  );
};

export default MovieTable;