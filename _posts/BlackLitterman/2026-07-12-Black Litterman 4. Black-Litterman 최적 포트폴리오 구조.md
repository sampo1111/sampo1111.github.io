---
layout: post
title:  "4. Black–Litterman 최적 포트폴리오 구조"
date:   2026-07-12 15:30:07 +0900
categories: [Quant Study, Black Litterman]
math: true
---

## 4.1 기대수익률의 불확실성까지 위험에 포함하기

앞 장에서 기대수익률의 사후분포를 다음과 같이 구했다.

$$
\mu\mid\text{views}
\sim
N(\bar\mu,\bar M^{-1})
$$

여기서 $\bar\mu$는 수정된 기대수익률이고, $\bar M^{-1}$은 기대수익률 추정의 불확실성이다.

실제 자산수익률은 기대수익률이 주어졌을 때

$$
r\mid\mu\sim N(\mu,\Sigma)
$$

를 따른다.

따라서 미래 수익률에는 두 가지 불확실성이 존재한다.

하나는 실제 수익률이 기대수익률 주변에서 움직이는 위험이고, 다른 하나는 기대수익률 자체를 정확히 알지 못한다는 불확실성이다.

전체분산법칙을 적용하면

$$
\operatorname{Var}(r)
=
E[\operatorname{Var}(r\mid\mu)]
+
\operatorname{Var}(E[r\mid\mu])
$$

이다.

각 항은

$$
E[\operatorname{Var}(r\mid\mu)]
=
\Sigma
$$

와

$$
\operatorname{Var}(E[r\mid\mu])
=
\bar M^{-1}
$$

이므로, 투자자가 최종적으로 고려해야 하는 공분산행렬은

$$
\boxed{
\bar\Sigma
=
\Sigma+\bar M^{-1}
}
$$

가 된다.

$\Sigma$가 실제 수익률의 변동성을 나타낸다면, $\bar M^{-1}$은 기대수익률을 잘못 추정할 가능성까지 위험에 포함한 것이다.

## 4.2 수정된 기대수익률로 포트폴리오 최적화하기

투자자는 $\bar\mu$와 $\bar\Sigma$를 이용해 다음 평균–분산 최적화 문제를 푼다.

$$
\max_w
\left\{
w^\top\bar\mu
-
\frac{\delta}{2}w^\top\bar\Sigma w
\right\}
$$

일계조건은

$$
\bar\mu-\delta\bar\Sigma w=0
$$

이므로 최적 포트폴리오는

$$
\boxed{
w^*
=
\frac{1}{\delta}\bar\Sigma^{-1}\bar\mu
}
$$

이다.

형태만 보면 일반적인 평균–분산 최적화와 같다.

차이는 사용되는 입력값이다.

기대수익률에는 시장균형과 투자자의 전망이 모두 반영되어 있고, 공분산에는 기대수익률 추정의 불확실성까지 포함되어 있다.

하지만 이 식만 봐서는 투자자의 전망이 실제 투자비중에 어떻게 반영되었는지 알기 어렵다.

논문은 이 포트폴리오를 다시 정리하여 훨씬 직관적인 형태를 얻는다.

## 4.3 시장 포트폴리오와 견해 포트폴리오의 결합

논문의 핵심 결과는 다음과 같다.

$$
w^*
=
\frac{1}{1+\tau}
\left(
w_{\mathrm{eq}}+P^\top\Lambda
\right)
$$

<details class="proof-toggle" markdown="1">
<summary>유도 과정</summary>

Black–Litterman 모형에서 기대수익률의 사후분포는

$$
\mu\mid Q
\sim
N(\bar\mu,\bar M^{-1})
\tag{A.1}
$$

이고, 사후 정밀도행렬은

$$
\bar M
=
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\tag{A.2}
$$

이다.

실제 수익률의 공분산은 기대수익률 추정의 불확실성까지 포함하므로

$$
\bar\Sigma
=
\Sigma+\bar M^{-1}
\tag{A.3}
$$

이다.

따라서 평균–분산 최적화의 일계조건은

$$
\bar\mu
=
\delta\bar\Sigma w^*
\tag{A.4}
$$

이며, 식 (A.3)을 대입하면

$$
\bar\mu
=
\delta
\left(
\Sigma+\bar M^{-1}
\right)w^*
\tag{A.5}
$$

이다.

식 (A.5)의 양변에 $\bar M$을 곱하면

$$
\bar M\bar\mu
=
\delta
\left(
\bar M\Sigma+I
\right)w^*
\tag{A.6}
$$

을 얻는다.

한편 Black–Litterman 사후평균은

$$
\bar\mu
=
\bar M^{-1}
\left[
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\right]
\tag{A.7}
$$

이므로, 양변에 $\bar M$을 곱하면

$$
\bar M\bar\mu
=
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\tag{A.8}
$$

이다.

식 (A.6)과 식 (A.8)을 결합하면

$$
\delta
\left(
\bar M\Sigma+I
\right)w^*
=
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\tag{A.9}
$$

를 얻는다.

이제 식 (A.2)를 이용하면

$$
\bar M\Sigma
=
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]\Sigma
\tag{A.10}
$$

이다.

여기서

$$
(\tau\Sigma)^{-1}\Sigma
=
\frac{1}{\tau}I
\tag{A.11}
$$

이므로

$$
\bar M\Sigma
=
\frac{1}{\tau}I
+
P^\top\Omega^{-1}P\Sigma
\tag{A.12}
$$

가 된다.

따라서

$$
\bar M\Sigma+I
=
\frac{1+\tau}{\tau}I
+
P^\top\Omega^{-1}P\Sigma
\tag{A.13}
$$

이다.

식 (A.13)을 식 (A.9)에 대입하면

$$
\delta
\left[
\frac{1+\tau}{\tau}I
+
P^\top\Omega^{-1}P\Sigma
\right]w^*
=
\frac{1}{\tau}\Sigma^{-1}\Pi
+
P^\top\Omega^{-1}Q
\tag{A.14}
$$

를 얻는다.

시장균형 위험프리미엄은

$$
\Pi
=
\delta\Sigma w_{\mathrm{eq}}
\tag{A.15}
$$

이므로

$$
\Sigma^{-1}\Pi
=
\delta w_{\mathrm{eq}}
\tag{A.16}
$$

이다.

따라서 식 (A.14)는

$$
\delta
\left[
\frac{1+\tau}{\tau}I
+
P^\top\Omega^{-1}P\Sigma
\right]w^*
=
\frac{\delta}{\tau}w_{\mathrm{eq}}
+
P^\top\Omega^{-1}Q
\tag{A.17}
$$

로 정리된다.

식 (A.17)의 양변에 $\tau/\delta$를 곱하면

$$
\left[
(1+\tau)I
+
\tau P^\top\Omega^{-1}P\Sigma
\right]w^*
=
w_{\mathrm{eq}}
+
P^\top\frac{\tau}{\delta}\Omega^{-1}Q
\tag{A.18}
$$

이다.

식 (A.18)을 전개하면

$$
(1+\tau)w^*
+
\tau P^\top\Omega^{-1}P\Sigma w^*
=
w_{\mathrm{eq}}
+
P^\top\frac{\tau}{\delta}\Omega^{-1}Q
\tag{A.19}
$$

가 된다.

$P^\top$이 포함된 항을 오른쪽에 모으면

$$
(1+\tau)w^*
=
w_{\mathrm{eq}}
+
P^\top
\left[
\frac{\tau}{\delta}\Omega^{-1}Q
-
\tau\Omega^{-1}P\Sigma w^*
\right]
\tag{A.20}
$$

을 얻는다.

이제 대괄호 안의 벡터를 $\Lambda$라고 정의하자.

$$
\Lambda
=
\frac{\tau}{\delta}\Omega^{-1}Q
-
\tau\Omega^{-1}P\Sigma w^*
\tag{A.21}
$$

그러면 식 (A.20)은

$$
(1+\tau)w^*
=
w_{\mathrm{eq}}
+
P^\top\Lambda
\tag{A.22}
$$

가 된다.

따라서 Black–Litterman 최적 포트폴리오는

$$
\boxed{
w^*
=
\frac{1}{1+\tau}
\left(
w_{\mathrm{eq}}
+
P^\top\Lambda
\right)
}
\tag{A.23}
$$

로 나타낼 수 있다.

식 (A.23)은 Black–Litterman 최적 포트폴리오가 축소된 시장균형 포트폴리오와 견해 포트폴리오들의 가중합으로 구성됨을 보여준다.

이제 $\Lambda$를 $w^*$를 포함하지 않는 형태로 나타내자.

식 (A.23)을 식 (A.21)에 대입하면

$$
\Lambda
=
\frac{\tau}{\delta}\Omega^{-1}Q
-
\frac{\tau}{1+\tau}
\Omega^{-1}P\Sigma
\left(
w_{\mathrm{eq}}
+
P^\top\Lambda
\right)
\tag{A.24}
$$

이다.

이를 전개하면

$$
\Lambda
=
\frac{\tau}{\delta}\Omega^{-1}Q
-
\frac{\tau}{1+\tau}
\Omega^{-1}P\Sigma w_{\mathrm{eq}}
-
\frac{\tau}{1+\tau}
\Omega^{-1}P\Sigma P^\top\Lambda
\tag{A.25}
$$

가 된다.

$\Lambda$를 포함하는 항을 왼쪽으로 옮기면

$$
\left[
I
+
\frac{\tau}{1+\tau}
\Omega^{-1}P\Sigma P^\top
\right]\Lambda
=
\frac{\tau}{\delta}\Omega^{-1}Q
-
\frac{\tau}{1+\tau}
\Omega^{-1}P\Sigma w_{\mathrm{eq}}
\tag{A.26}
$$

이다.

식 (A.26)의 양변에 $\Omega/\tau$를 곱하면

$$
\left[
\frac{\Omega}{\tau}
+
\frac{P\Sigma P^\top}{1+\tau}
\right]\Lambda
=
\frac{Q}{\delta}
-
\frac{P\Sigma w_{\mathrm{eq}}}{1+\tau}
\tag{A.27}
$$

를 얻는다.

이제

$$
A
=
\frac{\Omega}{\tau}
+
\frac{P\Sigma P^\top}{1+\tau}
\tag{A.28}
$$

라고 정의하면 식 (A.27)은

$$
A\Lambda
=
\frac{Q}{\delta}
-
\frac{P\Sigma w_{\mathrm{eq}}}{1+\tau}
\tag{A.29}
$$

가 된다.

$A$가 가역행렬이라면 양변에 $A^{-1}$을 곱하여

$$
\boxed{
\Lambda
=
A^{-1}
\left[
\frac{Q}{\delta}
-
\frac{P\Sigma w_{\mathrm{eq}}}{1+\tau}
\right]
}
\tag{A.30}
$$

을 얻는다.

따라서 Black–Litterman 최적 포트폴리오는 식 (A.23)과 식 (A.30)을 이용하여

$$
\boxed{
w^*
=
\frac{1}{1+\tau}
\left[
w_{\mathrm{eq}}
+
P^\top
A^{-1}
\left(
\frac{Q}{\delta}
-
\frac{P\Sigma w_{\mathrm{eq}}}{1+\tau}
\right)
\right]
}
\tag{A.31}
$$

로 나타낼 수 있다.

</details>

$P$의 각 행은 하나의 견해 포트폴리오다.

따라서

$$
P^\top\Lambda
=
\lambda_1p_1
+
\lambda_2p_2
+\cdots+
\lambda_Kp_K
$$

로 쓸 수 있다.

결국 최적 포트폴리오는

$$
w^*
=
\frac{1}{1+\tau}
\left(
w_{\mathrm{eq}}
+
\lambda_1p_1
+
\cdots+
\lambda_Kp_K
\right)
$$

가 된다.

즉, Black–Litterman 포트폴리오는 다음 구조를 가진다.

$$
\text{최적 포트폴리오}
=
\text{축소된 시장 포트폴리오}
+
\text{견해 포트폴리오들의 가중합}
$$

투자자는 시장 포트폴리오에서 출발한다.

그다음 자신이 가진 전망을 나타내는 포트폴리오를 각각 $\lambda_k$만큼 추가한다.

예를 들어 첫 번째 전망이 독일 매수와 프랑스·영국 매도이고, 두 번째 전망이 캐나다 매수와 미국 매도라면 최종 포트폴리오는 두 견해 포트폴리오를 시장 포트폴리오에 더한 형태가 된다.

이 결과가 중요한 이유는 기대수익률의 복잡한 변화를 직접 해석하지 않아도 되기 때문이다.

투자자가 어떤 전망을 입력했고, 그 전망 포트폴리오에 얼마만큼 투자했는지를 보면 최종 포트폴리오를 바로 이해할 수 있다.

## 4.4 $\Lambda$는 무엇을 결정하는가

$\Lambda$는 각 견해 포트폴리오를 얼마나 반영할지를 나타내는 벡터다.

논문의 식을 정리하면

$$
\Lambda
=
A^{-1}
\left(
\frac{Q}{\delta}
-
P\frac{\Sigma}{1+\tau}w_{\mathrm{eq}}
\right)
$$

로 쓸 수 있다.

여기서

$$
A
=

\frac{\Omega}{\tau}
+
P\frac{\Sigma}{1+\tau}P^\top
$$

이다.

괄호 안의 첫 번째 항

$$
\frac{Q}{\delta}
$$

는 투자자가 제시한 전망의 강도를 나타낸다.

두 번째 항

$$
P\frac{\Sigma}{1+\tau}w_{\mathrm{eq}}
$$

는 시장 포트폴리오가 이미 암묵적으로 포함하고 있는 전망을 나타낸다.

따라서 $\Lambda$는 단순히 $Q$가 크다고 커지는 값이 아니다.

투자자의 전망이 시장에서 이미 반영된 정도를 넘어서는지를 함께 비교한다.

또한 $A$에는 전망의 불확실성 $\Omega$뿐 아니라

$$
P\Sigma P^\top
$$

도 포함된다.

이 행렬의 대각원소는 각 견해 포트폴리오의 위험을 나타내고, 대각선 밖의 원소는 견해 포트폴리오 사이의 공분산을 나타낸다.

따라서 서로 비슷한 전망을 여러 개 입력하면 각각을 독립적인 정보처럼 그대로 더하지 않는다.

겹치는 정도를 고려해 각 $\lambda_k$가 조정된다.

## 4.5 새로운 전망은 언제 매수 또는 매도로 이어지는가

기존에 $K$개의 전망이 반영되어 있는데 새로운 전망

$$
p^\top\mu=q
$$

를 추가한다고 하자.

논문은 새로운 견해 포트폴리오의 비중을 다음과 같이 나타낸다.

$$
\hat\lambda_{K+1}
=
\frac{
q-p^\top\tilde\mu
}{
\delta(c-b^\top A^{-1}b)
}
$$

여기서 분모는 항상 양수다.

<details class="proof-toggle" markdown="1">
<summary>유도 과정</summary>

기존에 $K$개의 견해가 주어져 있다고 하자. 견해행렬, 전망값 벡터, 전망오차의 공분산행렬을 각각 $P$, $Q$, $\Omega$라고 한다.

계산을 간단하게 하기 위해

$$
G
=
\frac{\Sigma}{1+\tau}
\tag{B.1}
$$

라고 정의하자.

기존 견해 포트폴리오의 비중 벡터 $\Lambda$는

$$
\Lambda
=
A^{-1}
\left(
\frac{Q}{\delta}
-
PGw_{\mathrm{eq}}
\right)
\tag{B.2}
$$

로 나타낼 수 있다. 여기서

$$
A
=
\frac{\Omega}{\tau}
+
PGP^\top
\tag{B.3}
$$

이다.

따라서 식 (B.2)는 다음 연립방정식과 같다.

$$
A\Lambda
=
\frac{Q}{\delta}
-
PGw_{\mathrm{eq}}
\tag{B.4}
$$

이제 투자자가 새로운 견해 하나를 추가한다고 하자. 새로운 견해는

$$
p^\top\mu
=
q+\varepsilon,
\qquad
\varepsilon\sim N(0,\omega)
\tag{B.5}
$$

로 표현한다.

여기서 $p\in\mathbb R^N$은 새로운 견해 포트폴리오이고, $q$는 해당 견해 포트폴리오에 대해 투자자가 예상한 기대수익률이며, $\omega$는 새로운 견해의 불확실성이다.

새로운 견해를 기존 견해에 추가하면 견해행렬과 전망값 벡터는

$$
\widehat P
=
\begin{pmatrix}
P\\
p^\top
\end{pmatrix},
\qquad
\widehat Q
=
\begin{pmatrix}
Q\\
q
\end{pmatrix}
\tag{B.6}
$$

가 된다.

기존 견해의 오차와 새로운 견해의 오차가 서로 독립이라고 가정하면 전망오차의 공분산행렬은

$$
\widehat\Omega
=
\begin{pmatrix}
\Omega & 0\\
0 & \omega
\end{pmatrix}
\tag{B.7}
$$

로 확장된다.

새로운 견해를 포함한 행렬 $\widehat A$는

$$
\widehat A
=
\frac{\widehat\Omega}{\tau}
+
\widehat P G\widehat P^\top
\tag{B.8}
$$

이다.

식 (B.6)과 식 (B.7)을 식 (B.8)에 대입하면

$$
\widehat A
=
\begin{pmatrix}
A & b\\
b^\top & c
\end{pmatrix}
\tag{B.9}
$$

의 블록행렬로 나타낼 수 있다. 여기서

$$
b
=
PGp
=
P\frac{\Sigma}{1+\tau}p
\tag{B.10}
$$

이고,

$$
c
=
\frac{\omega}{\tau}
+
p^\top Gp
=
\frac{\omega}{\tau}
+
p^\top\frac{\Sigma}{1+\tau}p
\tag{B.11}
$$

이다.

새로운 견해를 추가한 뒤의 전체 비중 벡터를

$$
\widehat\Lambda
=
\begin{pmatrix}
x\\
\widehat\lambda_{K+1}
\end{pmatrix}
\tag{B.12}
$$

라고 하자.

여기서 $x$는 새로운 견해가 추가된 뒤 조정된 기존 $K$개 견해의 비중 벡터이고, $\widehat\lambda_{K+1}$은 새롭게 추가된 견해 포트폴리오의 비중이다.

새로운 견해를 포함한 비중 벡터는

$$
\widehat A\widehat\Lambda
=
\frac{\widehat Q}{\delta}
-
\widehat P G w_{\mathrm{eq}}
\tag{B.13}
$$

을 만족한다.

오른쪽 항을

$$
h
=
\frac{Q}{\delta}
-
PGw_{\mathrm{eq}}
\tag{B.14}
$$

와

$$
s
=
\frac{q}{\delta}
-
p^\top Gw_{\mathrm{eq}}
\tag{B.15}
$$

로 정의하면 식 (B.13)은

$$
\begin{pmatrix}
A & b\\
b^\top & c
\end{pmatrix}
\begin{pmatrix}
x\\
\widehat\lambda_{K+1}
\end{pmatrix}
=
\begin{pmatrix}
h\\
s
\end{pmatrix}
\tag{B.16}
$$

가 된다.

블록행렬의 곱을 전개하면

$$
Ax
+
b\widehat\lambda_{K+1}
=
h
\tag{B.17}
$$

와

$$
b^\top x
+
c\widehat\lambda_{K+1}
=
s
\tag{B.18}
$$

를 얻는다.

식 (B.17)을 $x$에 대해 정리하면

$$
Ax
=
h
-
b\widehat\lambda_{K+1}
\tag{B.19}
$$

이므로

$$
x
=
A^{-1}h
-
A^{-1}b\widehat\lambda_{K+1}
\tag{B.20}
$$

이다.

한편 식 (B.4)에 의해

$$
A^{-1}h
=
\Lambda
\tag{B.21}
$$

이므로 식 (B.20)은

$$
x
=
\Lambda
-
\widehat\lambda_{K+1}A^{-1}b
\tag{B.22}
$$

가 된다.

따라서 새로운 견해를 추가한 뒤의 전체 비중 벡터는

$$
\boxed{
\widehat\Lambda
=
\begin{pmatrix}
\Lambda-\widehat\lambda_{K+1}A^{-1}b\\
\widehat\lambda_{K+1}
\end{pmatrix}
}
\tag{B.23}
$$

로 나타낼 수 있다.

이는 새로운 견해가 추가되면 새로운 견해의 비중만 생성되는 것이 아니라, 새로운 견해와 기존 견해 사이의 관계에 따라 기존 견해의 비중도 조정된다는 것을 의미한다.

이제 새로운 견해의 비중 $\widehat\lambda_{K+1}$을 구하자.

식 (B.22)를 식 (B.18)에 대입하면

$$
b^\top
\left(
\Lambda
-
\widehat\lambda_{K+1}A^{-1}b
\right)
+
c\widehat\lambda_{K+1}
=
s
\tag{B.24}
$$

이다.

이를 전개하면

$$
b^\top\Lambda
-
\widehat\lambda_{K+1}b^\top A^{-1}b
+
c\widehat\lambda_{K+1}
=
s
\tag{B.25}
$$

를 얻는다.

$\widehat\lambda_{K+1}$을 포함하는 항을 묶으면

$$
\left(
c-b^\top A^{-1}b
\right)
\widehat\lambda_{K+1}
=
s-b^\top\Lambda
\tag{B.26}
$$

이므로

$$
\widehat\lambda_{K+1}
=
\frac{
s-b^\top\Lambda
}{
c-b^\top A^{-1}b
}
\tag{B.27}
$$

이다.

이제 식 (B.27)의 분자를 정리한다. 식 (B.10)과 식 (B.15)에 의해

$$
b^\top\Lambda
=
p^\top GP^\top\Lambda
\tag{B.28}
$$

이므로

$$
s-b^\top\Lambda
=
\frac{q}{\delta}
-
p^\top Gw_{\mathrm{eq}}
-
p^\top GP^\top\Lambda
\tag{B.29}
$$

이다.

오른쪽의 마지막 두 항을 묶으면

$$
s-b^\top\Lambda
=
\frac{q}{\delta}
-
p^\top G
\left(
w_{\mathrm{eq}}
+
P^\top\Lambda
\right)
\tag{B.30}
$$

을 얻는다.

기존 $K$개의 견해를 반영한 Black–Litterman 최적 포트폴리오는

$$
w^*
=
\frac{1}{1+\tau}
\left(
w_{\mathrm{eq}}
+
P^\top\Lambda
\right)
\tag{B.31}
$$

이다.

또한 식 (B.1)에 의해

$$
G
=
\frac{\Sigma}{1+\tau}
$$

이므로

$$
G
\left(
w_{\mathrm{eq}}
+
P^\top\Lambda
\right)
=
\Sigma w^*
\tag{B.32}
$$

이다.

따라서 식 (B.30)은

$$
s-b^\top\Lambda
=
\frac{q}{\delta}
-
p^\top\Sigma w^*
\tag{B.33}
$$

로 정리된다.

이제 기존 최적 포트폴리오가 암묵적으로 나타내는 기대수익률 벡터를

$$
\widetilde\mu
=
\delta\Sigma w^*
\tag{B.34}
$$

라고 정의하자.

한편 Black–Litterman 최적 포트폴리오는

$$
w^*
=
\frac{1}{\delta}
\bar\Sigma^{-1}\bar\mu
\tag{B.35}
$$

이므로 식 (B.34)는

$$
\widetilde\mu
=
\Sigma\bar\Sigma^{-1}\bar\mu
\tag{B.36}
$$

로도 나타낼 수 있다.

식 (B.34)에 의해

$$
p^\top\Sigma w^*
=
\frac{1}{\delta}
p^\top\widetilde\mu
\tag{B.37}
$$

이므로 식 (B.33)은

$$
s-b^\top\Lambda
=
\frac{1}{\delta}
\left(
q-p^\top\widetilde\mu
\right)
\tag{B.38}
$$

가 된다.

식 (B.38)을 식 (B.27)에 대입하면 새로운 견해 포트폴리오의 비중은

$$
\boxed{
\widehat\lambda_{K+1}
=
\frac{
q-p^\top\widetilde\mu
}{
\delta
\left(
c-b^\top A^{-1}b
\right)
}
}
\tag{B.39}
$$

로 나타난다.

마지막으로 식 (B.39)의 분모가 양수임을 확인하자.

$\widehat\Omega$가 양의 정부호이고 $G$가 양의 준정부호이면

$$
\widehat A
=
\frac{\widehat\Omega}{\tau}
+
\widehat P G\widehat P^\top
\tag{B.40}
$$

는 양의 정부호이다.

양의 정부호인 블록행렬

$$
\widehat A
=
\begin{pmatrix}
A & b\\
b^\top & c
\end{pmatrix}
$$

에서 $A$에 대한 Schur complement는 양수이므로

$$
c-b^\top A^{-1}b
>
0
\tag{B.41}
$$

이다.

또한 $\delta>0$이므로 식 (B.39)의 분모는 항상 양수다. 따라서 새로운 견해 포트폴리오 비중의 부호는 분자

$$
q-p^\top\widetilde\mu
$$

의 부호에 의해 결정된다.

투자자의 새로운 전망이 기존 모형의 암묵적 예상보다 낙관적이면

$$
q
>
p^\top\widetilde\mu
\quad\Longrightarrow\quad
\widehat\lambda_{K+1}
>
0
\tag{B.42}
$$

이다.

반대로 새로운 전망이 기존 모형의 암묵적 예상보다 비관적이면

$$
q
<
p^\top\widetilde\mu
\quad\Longrightarrow\quad
\widehat\lambda_{K+1}
<
0
\tag{B.43}
$$

이다.

새로운 전망이 기존 모형의 예상과 정확히 같다면

$$
q
=
p^\top\widetilde\mu
\quad\Longrightarrow\quad
\widehat\lambda_{K+1}
=
0
\tag{B.44}
$$

이 된다.

따라서 새로운 견해 포트폴리오의 비중은 투자자가 제시한 새로운 전망 $q$와 기존 모형이 암묵적으로 예상한 수익률 $p^\top\widetilde\mu$의 차이에 의해 결정된다.


</details>

따라서 새로운 전망의 방향은 분자

$$
q-p^\top\tilde\mu
$$

에 의해 결정된다.

$\tilde\mu$는 기존 시장정보와 기존 전망이 암묵적으로 만들어내는 기대수익률이다.

논문에서는

$$
\tilde\mu
=
\Sigma\bar\Sigma^{-1}\bar\mu
$$

로 정의한다.

또한

$$
w^*
=
\frac{1}{\delta}\bar\Sigma^{-1}\bar\mu
$$

이므로

$$
\tilde\mu
=
\delta\Sigma w^*
$$

로도 쓸 수 있다.

즉, 기존 최적 포트폴리오를 원래 공분산행렬 $\Sigma$를 이용해 다시 기대수익률로 역산한 값이다.

투자자의 새로운 전망이 기존 모형의 예상보다 낙관적이면

$$
q>p^\top\tilde\mu
$$

이고,

$$
\hat\lambda_{K+1}>0
$$

이 된다.

따라서 새로운 견해 포트폴리오를 매수한다.

반대로 새로운 전망이 기존 예상보다 비관적이면

$$
q<p^\top\tilde\mu
$$

이고,

$$
\hat\lambda_{K+1}<0
$$

이 된다.

이 경우 견해 포트폴리오와 반대 방향의 포지션을 취한다.

$$
q=p^\top\tilde\mu
$$

일 때는

$$
\hat\lambda_{K+1}=0
$$

이므로 새로운 포지션은 전혀 생기지 않는다.

새로운 전망이라고 입력했지만, 그 내용이 시장과 기존 전망에 이미 반영되어 있기 때문이다.

## 4.6 전망의 강도와 신뢰도

논문은 각 견해 포트폴리오의 비중 $\lambda_k$가 전망에 따라 어떻게 변하는지도 보여준다.

먼저 $k$번째 전망값 $q_k$가 변할 때

$$
\frac{\partial\lambda_k}{\partial q_k}
=
\frac{1}{\delta}
(A^{-1})_{kk}
$$

이다.

$A$는 양의 정부호이므로 $A^{-1}$도 양의 정부호이고, 대각원소는 양수다.

따라서

$$
\frac{\partial\lambda_k}{\partial q_k}>0
$$

이다.

즉, 투자자가 해당 견해 포트폴리오에 대해 더 높은 수익률을 예상할수록 $\lambda_k$는 증가한다.

예를 들어 캐나다가 미국보다 3% 높은 수익률을 낼 것이라는 전망을 4%로 높이면, 캐나다 매수·미국 매도 포지션도 커진다.

전망의 신뢰도는 $\omega_k^{-1}$로 나타낼 수 있다.

논문은 다음 관계를 보인다.

$$
\frac{\partial\lambda_k}
{\partial\omega_k^{-1}}
=
\frac{\omega_k^2}{\tau}
(A^{-1})_{kk}\lambda_k
$$

오른쪽의 다른 항들은 모두 양수이므로, 이 미분값은 $\lambda_k$와 같은 부호를 가진다.

$\lambda_k>0$인 낙관적 전망이라면 신뢰도가 높아질수록 $\lambda_k$가 더 커진다.

$\lambda_k<0$인 비관적 전망이라면 신뢰도가 높아질수록 $\lambda_k$가 더 작아져 음의 포지션이 확대된다.

따라서 방향과 관계없이

$$
\text{전망의 신뢰도 증가}
\quad\Longrightarrow\quad
|\lambda_k|\text{ 증가}
$$

이다.

신뢰도는 매수인지 매도인지를 결정하지 않는다.

이미 정해진 포지션의 크기를 확대하거나 축소한다.

## 4.7 시장 포트폴리오의 축소와 현실적인 제약

최적 포트폴리오에는

$$
\frac{1}{1+\tau}
$$

라는 계수가 붙어 있다.

이 값은 전망이 없는 경우를 생각하면 쉽게 이해할 수 있다.

전망이 없다면 사후기대수익률은

$$
\bar\mu=\Pi
$$

이고, 기대수익률의 불확실성은

$$
\bar M^{-1}=\tau\Sigma
$$

이다.

따라서 전체 공분산은

$$
\bar\Sigma
=
\Sigma+\tau\Sigma
=
(1+\tau)\Sigma
$$

가 된다.

기대수익률은 그대로지만 위험은 $(1+\tau)$배가 되었으므로 최적 위험자산 비중은

$$
w^*
=
\frac{1}{1+\tau}w_{\mathrm{eq}}
$$

가 된다.

시장균형 기대수익률을 완전히 확신하지 못하기 때문에 시장 포트폴리오를 조금 줄이는 것이다.

예를 들어

$$
\tau=0.05
$$

이면

$$
\frac{1}{1+\tau}
=
\frac{1}{1.05}
\approx0.9524
$$

이므로 시장 포트폴리오의 약 95.24%를 보유한다.

나머지는 무위험자산에 투자한 것으로 해석할 수 있다.

투자자의 위험회피계수가 시장의 대표 위험회피계수와 다르면 포트폴리오 전체를 비례적으로 조정할 수 있다.

투자자의 위험회피계수를 $\hat\delta$라고 하면

$$
\hat w^*
=
\frac{\delta}{\hat\delta}w^*
$$

이다.

위험을 더 싫어하는 투자자는 전체 위험자산 노출을 줄이고, 위험을 덜 싫어하는 투자자는 노출을 늘린다.

목표 변동성이 $\sigma$로 정해진 경우에도 포트폴리오 방향은 유지한 채 전체 크기만 조절한다.

$$
\tilde w^*
=
\frac{
\sigma\delta
}{
\sqrt{
\bar\mu^\top\bar\Sigma^{-1}\bar\mu
}
}
w^*
$$

다만 공매도 금지, 최대 투자비중, 완전투자 조건 등의 제약이 들어가면

$$
w^*
=
\frac{1}{1+\tau}
\left(
w_{\mathrm{eq}}+P^\top\Lambda
\right)
$$

라는 단순한 분해식은 정확히 유지되지 않을 수 있다.

이 경우에는 Black–Litterman으로 계산한 $\bar\mu$와 $\bar\Sigma$를 제약조건이 포함된 일반적인 포트폴리오 최적화에 넣어야 한다.
