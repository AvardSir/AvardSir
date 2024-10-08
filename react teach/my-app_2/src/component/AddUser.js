import React from 'react';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      image: "",
      isHappy: false,
    };
  }

  handleAddUser = () => {
    const { name: first_name, bio, image, isHappy } = this.state;
    
    if (first_name && bio && image) {
      this.props.onAddUser({
        id: Date.now(), // Генерация уникального ID для пользователя
        first_name,
        bio,
        image,
        isHappy,
      });

      this.setState({
        first_name: "",
        bio: "",
        image: "",
        isHappy: false,
      });
    } else {
      alert("Пожалуйста, заполните все поля!");
    }
  };

  render() {
    return (
      <div className="Add-user">
        <input
          placeholder="Name"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          value={this.state.bio}
          onChange={(e) => this.setState({ bio: e.target.value })}
        ></textarea>
        <input
          placeholder="Link to image"
          value={this.state.image}
          onChange={(e) => this.setState({ image: e.target.value })}
        />

        <label htmlFor="isHappy">Счастлив?</label>
        <input
          type="checkbox"
          id="isHappy"
          checked={this.state.isHappy}
          onChange={(e) => this.setState({ isHappy: e.target.checked })}
        />

        <button type="button" onClick={this.handleAddUser}>
          Добавить
        </button>
      </div>
    );
  }
}

export default AddUser;
