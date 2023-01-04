const LogForm = ({}) => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                />
            </div>
            </form>
    );
};

export default LogForm;
