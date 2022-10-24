create-page:
	cp -vn template.md pages/posts/$(title).md

update-packages:
	npm install

run-local:
	npm run dev
