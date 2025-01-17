import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // Путь к вашему контексту

export const AnecdoteCommentsСomponent = () => {
  const { anecdoteId } = useParams(); // Получаем ID анекдота из URL
  const { loginData } = useContext(AuthContext); // Извлекаем данные о пользователе из контекста
  const [anecdote, setAnecdote] = useState(null); // Состояние для анекдота
  const [comments, setComments] = useState([]); // Состояние для комментариев
  const [newComment, setNewComment] = useState(""); // Состояние для нового комментария
  const [userId, setUserId] = useState(null); // Состояние для ID пользователя

  useEffect(() => {
    // Запрос на получение анекдота
    fetch(`/api/anecdotes`)
      .then((res) => res.json())
      .then((data) => {
        // Ищем анекдот с нужным ID
        const foundAnecdote = data.find((a) => a.IdAnecdote === parseInt(anecdoteId));
        setAnecdote(foundAnecdote); // Устанавливаем анекдот
      })
      .catch((err) => console.error("Ошибка загрузки анекдота:", err));

    // Получение комментариев для текущего анекдота
    fetch(`/api/comments-anecdote?anecdoteId=${anecdoteId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Ошибка загрузки комментариев:", err));

    // Запрос на получение ID пользователя по имени из контекста
    if (loginData && loginData.login) {

      fetch(`/api/IdByUsername?Name=${encodeURIComponent(loginData.login)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Ошибка сети или сервер вернул ошибку');
        }
        return res.json();
    })
    .then((data) => {
        if (data && data.IdUser) {
          
            setUserId(data.IdUser); // Сохраняем IdUser
        } else {
            console.error("Не удалось получить IdUser.");
        }
    })
    .catch((err) => console.error("Ошибка при получении IdUser:", err));
    
    }
    
  }, [anecdoteId, loginData]);

  const handleAddComment = () => {
    if (!newComment) {
      return alert("Комментарий не может быть пустым.");
    }

    // Проверяем, есть ли данные о пользователе в контексте
    if (!loginData || !loginData.login || !userId) {
      return alert("Пожалуйста, войдите в систему, чтобы добавить комментарий.");
    }
    
    console.log(newComment);
    console.log(anecdoteId);
    console.log(userId);
    // Добавление нового комментария
    fetch(`/api/add-comment-anecdote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Text: newComment,
        IdUser: userId, // Используем реальный Id пользователя
        IdAnecdote: anecdoteId,
        
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Комментарий успешно добавлен") {
          // После успешного добавления комментария, обновляем список
          setComments([
            ...comments,
            {
              Text: newComment,
              Date: new Date().toISOString(),
              AuthorName: loginData.login, // Используем имя пользователя из контекста
            },
          ]);
          setNewComment(""); // Очищаем поле ввода
        } else {
          console.error("Ошибка при добавлении комментария:", data.error);
        }
      })
      .catch((err) => console.error("Ошибка добавления комментария:", err));
  };

  return (
    <div className="anecdote-comments-page">
      {anecdote ? (
        <div>
          <h3>Анекдот #{anecdote.IdAnecdote}</h3>
          <p>{anecdote.Text}</p>
          <p><strong>{anecdote.UserName}</strong> ({new Date(anecdote.Date).toLocaleDateString()})</p>
          <p><strong>Тип:</strong> {anecdote.AnecdoteType}</p>
          <p><strong>Оценка:</strong> {anecdote.Rate}</p>
        </div>
      ) : (
        <p>Загрузка анекдота...</p>
      )}

      <h4>Комментарии:</h4>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.Text}</p>
              <p><strong>{comment.AuthorName}</strong> ({new Date(comment.Date).toLocaleDateString()})</p>
            </li>
          ))
        ) : (
          <p>Комментариев нет</p>
        )}
      </ul>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Добавить комментарий"
        />
        <button onClick={handleAddComment}>Добавить</button>
      </div>
    </div>
  );
};
