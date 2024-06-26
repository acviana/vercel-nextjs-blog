build:
	npm run build

create-page:
	cp -vn template.md pages/posts/$(title).md

check-packages:
	npm outdated

update-packages:
	npm install

run-local:
	npm run dev
