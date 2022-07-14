export function createSubmitHandler(form, callback) {
    form.addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);

        const topicName = formData.get('topicName').trim();
        const username = formData.get('username').trim();
        const postText = formData.get('postText').trim();

        if (!topicName || !username || !postText) {
            alert('All fields are required!');
            return;
        }

        callback(Object.fromEntries([...formData.entries()]));
    }
}