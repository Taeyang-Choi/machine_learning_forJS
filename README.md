# 자바스크립트로 구현한 머신러닝

mnist_test.csv, mnist_train.csv 데이터의 경우 GitHub 업로드 용량 제한으로 https://www.kaggle.com/oddrationale/mnist-in-csv 사이트에서 다운로드 후
1행과 마지막행 삭제후 데이터 테스트


# release note

20201105 linear regression 구현, d3 이용하여 예시데이터 그래프 테스트

20201112 logistic regression, multi-value 구현, logic_gate(and, or, nand) 구현

20201115 xorgate backpropagation 구현(데이터 학습 방식 변경), 함수 리빌딩 

20201117 mnist backpropagation 구현, 1만개 데이터 랜덤 순서로 반복 학습 방식



# 개선 필수 사항

- mnist 데이터를 불러오는 과정이 너무 시간이 오래걸림. 분할해서 불러오던, 반복해서 불러오던 하는 방법이 필요함(6만개 데이터인데 1만개 불러와서 테스트)
- W, b 저장 구문 추가해야함.