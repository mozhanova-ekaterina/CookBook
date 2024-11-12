export const validateEmail = (email: string) => {
  if (!(/\S+@\S+\.\S+/.test(email))) {
    return {
      error: 'Некорректный Email'
    }
  }
}

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return {
      error: 'Пароль должен быть не менее 8 символов'
    };
  }
}

export const validateName = (name: string) => {
  if (!name) {
    return {
      error: 'Поле не может быть пустым'
    }
  }
};
