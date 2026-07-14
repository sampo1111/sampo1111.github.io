---
layout: post
title:  "3. 시장정보와 전망의 결합"
date:   2026-07-12 15:30:07 +0900
categories: [Quant Study, Black Litterman]
math: true
---

## 3.1 베이즈 갱신의 기본 생각

앞 장에서 Black–Litterman 모형에 필요한 두 정보를 정리했다.

시장균형에서 얻은 사전정보는

$$
\mu\sim N(\Pi,\tau\Sigma)
$$

이고, 투자자의 전망은

$$
P\mu=Q+\varepsilon^{(v)}
$$

이다.

Black–Litterman 모형은 시장균형과 투자자의 전망을 각각 얼마나 신뢰할 수 있는지에 따라 두 정보를 결합한다.

$$
\text{시장균형 정보}
+
\text{투자자의 전망}
\longrightarrow
\text{수정된 기대수익률}
$$

이를 베이즈 관점에서 보면 시장균형은 사전분포이고, 투자자의 전망은 새롭게 들어온 정보다. 두 정보를 결합한 결과가 사후분포다.

$$
\text{사전분포}
+
\text{새로운 정보}
\longrightarrow
\text{사후분포}
$$

논문은 시장균형 기대수익률의 오차와 투자자 전망의 오차가 서로 독립이라고 가정한다.

$$
\begin{pmatrix}
\varepsilon^{(e)}\\
\varepsilon^{(v)}
\end{pmatrix}
\sim
N
\left(
0,
\begin{pmatrix}
\tau\Sigma & 0\\
0 & \Omega
\end{pmatrix}
\right)
$$

공분산행렬의 대각선 밖이 0이라는 것은 두 오차 사이에 공분산이 없다는 뜻이다.

즉, 시장균형 기대수익률이 틀리는 이유와 투자자의 전망이 틀리는 이유를 서로 별개의 것으로 본다.

## 3.2 시장균형 정보의 정밀도

시장균형에 대한 사전분포는

$$
\mu\sim N(\Pi,\tau\Sigma)
$$

이다.

여기서 평균 $\Pi$는 시장 포트폴리오로부터 역산한 시장균형 기대수익률이고, 공분산 $\tau\Sigma$는 그 값에 대한 불확실성을 나타낸다.

베이즈 결합에서는 분산보다 분산의 역수인 정밀도가 편리하게 사용된다.

$$
\text{정밀도}
=
\text{공분산의 역행렬}
$$

따라서 시장균형 정보의 정밀도는

$$
(\tau\Sigma)^{-1}
$$

이다.

$\tau$가 작으면 사전공분산 $\tau\Sigma$도 작아진다. 그만큼 시장균형 기대수익률을 강하게 신뢰한다는 뜻이다.

$$
\tau\downarrow
\quad\Longrightarrow\quad
(\tau\Sigma)^{-1}\uparrow
$$

반대로 $\tau$가 크면 시장균형 기대수익률에 대한 불확실성이 커지고 정밀도는 낮아진다.

$$
\tau\uparrow
\quad\Longrightarrow\quad
(\tau\Sigma)^{-1}\downarrow
$$

따라서 시장균형 정보가 사후기대수익률에 얼마나 강하게 반영되는지는 $(\tau\Sigma)^{-1}$로 결정된다.

## 3.3 투자자 전망의 정밀도

투자자의 전망은

$$
P\mu=Q+\varepsilon^{(v)}
$$

로 표현된다.

전망 오차는

$$
\varepsilon^{(v)}
\sim N(0,\Omega)
$$

를 따른다.

따라서 전망의 정밀도는

$$
\Omega^{-1}
$$

이다.

$\Omega$가 작으면 전망의 오차가 작다고 보는 것이므로 전망을 강하게 신뢰한다.

$$
\Omega\downarrow
\quad\Longrightarrow\quad
\Omega^{-1}\uparrow
$$

반대로 $\Omega$가 크면 전망의 불확실성이 크므로 사후기대수익률에 미치는 영향도 작아진다.

$$
\Omega\uparrow
\quad\Longrightarrow\quad
\Omega^{-1}\downarrow
$$

논문에서는 설명을 단순하게 하기 위해 $\Omega$를 주로 대각행렬로 둔다.

전망이 $K$개라면

$$
\Omega
=
\begin{pmatrix}
\omega_1 & 0 & \cdots & 0\\
0 & \omega_2 & \cdots & 0\\
\vdots & \vdots & \ddots & \vdots\\
0 & 0 & \cdots & \omega_K
\end{pmatrix}
$$

이다.

이 경우 각 전망의 오차는 서로 독립이며, $\omega_k$는 $k$번째 전망의 불확실성을 나타낸다.

다만 논문은 $\Omega$가 반드시 대각행렬일 필요는 없다고 설명한다. 전망 오차들이 서로 관련되어 있다면 대각선 밖의 원소에 공분산을 넣을 수 있다.

또한 대각행렬이 아닌 $\Omega$도 적절한 선형변환을 통해 서로 독립인 전망의 형태로 바꿀 수 있다. 따라서 $\Omega$를 대각행렬로 두는 것은 설명을 편리하게 하기 위한 설정에 가깝다고 볼 수 있다.

## 3.4 Black–Litterman 사후기대수익률

시장균형 정보와 투자자의 전망을 결합하면 기대수익률 $\mu$의 사후분포도 정규분포가 된다.

$$
\mu\mid\text{views}
\sim
N(\bar\mu,\bar M^{-1})
$$

여기서 $\bar\mu$는 시장균형과 투자자의 전망을 모두 반영한 새로운 기대수익률이다.

논문의 식 (8)은 다음과 같다.

$$
\bar\mu
=
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]^{-1}
\left[
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\right]
$$

<details class="proof-toggle" markdown="1">
<summary>Black–Litterman 사후분포의 유도</summary>

베이즈 정리에 따라 $\mu$의 사후밀도는 사전밀도와 우도의 곱에 비례한다.

$$
p(\mu\mid Q)
\propto
p(Q\mid\mu)p(\mu)
$$

먼저 사전분포가

$$
\mu\sim N(\Pi,\tau\Sigma)
$$

이므로, $\mu$의 사전밀도는

$$
p(\mu)
=
\frac{1}
{(2\pi)^{N/2}|\tau\Sigma|^{1/2}}
\exp\left[
-\frac12
(\mu-\Pi)^\top
(\tau\Sigma)^{-1}
(\mu-\Pi)
\right]
$$

이다.

다음으로

$$
Q\mid\mu\sim N(P\mu,\Omega)
$$

이므로, $Q$의 조건부밀도는

$$
p(Q\mid\mu)
=
\frac{1}
{(2\pi)^{K/2}|\Omega|^{1/2}}
\exp\left[
-\frac12
(Q-P\mu)^\top
\Omega^{-1}
(Q-P\mu)
\right]
$$

이다.

따라서 사후밀도는

$$
p(\mu\mid Q)
\propto
\exp\left[
-\frac12
(\mu-\Pi)^\top
(\tau\Sigma)^{-1}
(\mu-\Pi)
\right]
$$

$$
\qquad\qquad\times
\exp\left[
-\frac12
(Q-P\mu)^\top
\Omega^{-1}
(Q-P\mu)
\right]
$$

로 나타낼 수 있다.

두 지수함수를 하나로 합치면

$$
p(\mu\mid Q)
\propto
\exp\left[
-\frac12
\left\{
(\mu-\Pi)^\top
(\tau\Sigma)^{-1}
(\mu-\Pi)
+
(Q-P\mu)^\top
\Omega^{-1}
(Q-P\mu)
\right\}
\right]
$$

이다.

이제 지수 안의 이차식을 $\mu$에 관하여 정리한다.

먼저 첫 번째 항을 전개하면

$$
(\mu-\Pi)^\top
(\tau\Sigma)^{-1}
(\mu-\Pi)
$$

$$
=
\mu^\top(\tau\Sigma)^{-1}\mu
-
\mu^\top(\tau\Sigma)^{-1}\Pi
-
\Pi^\top(\tau\Sigma)^{-1}\mu
+
\Pi^\top(\tau\Sigma)^{-1}\Pi
$$

이다.

$(\tau\Sigma)^{-1}$은 대칭행렬이므로

$$
\mu^\top(\tau\Sigma)^{-1}\Pi
=
\Pi^\top(\tau\Sigma)^{-1}\mu
$$

이다. 따라서

$$
(\mu-\Pi)^\top
(\tau\Sigma)^{-1}
(\mu-\Pi)
$$

$$
=
\mu^\top(\tau\Sigma)^{-1}\mu
-
2\mu^\top(\tau\Sigma)^{-1}\Pi
+
\Pi^\top(\tau\Sigma)^{-1}\Pi
$$

를 얻는다.

다음으로 두 번째 항을 전개하면

$$
(Q-P\mu)^\top
\Omega^{-1}
(Q-P\mu)
$$

$$
=
Q^\top\Omega^{-1}Q
-
Q^\top\Omega^{-1}P\mu
-
\mu^\top P^\top\Omega^{-1}Q
+
\mu^\top P^\top\Omega^{-1}P\mu
$$

이다.

$\Omega^{-1}$ 역시 대칭행렬이므로

$$
Q^\top\Omega^{-1}P\mu
=
\mu^\top P^\top\Omega^{-1}Q
$$

이다. 따라서

$$
(Q-P\mu)^\top
\Omega^{-1}
(Q-P\mu)
$$

$$
=
\mu^\top P^\top\Omega^{-1}P\mu
-
2\mu^\top P^\top\Omega^{-1}Q
+
Q^\top\Omega^{-1}Q
$$

가 된다.

두 전개식을 합하면

$$
(\mu-\Pi)^\top
(\tau\Sigma)^{-1}
(\mu-\Pi)
+
(Q-P\mu)^\top
\Omega^{-1}
(Q-P\mu)
$$

$$
=
\mu^\top
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]
\mu
-
2\mu^\top
\left[
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\right]
+
C
$$

이다.

여기서

$$
C
=

\Pi^\top(\tau\Sigma)^{-1}\Pi
+
Q^\top\Omega^{-1}Q
$$

는 $\mu$와 무관한 상수이다.

이제 다음과 같이 정의하자.

$$
\bar M
=
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
$$

그리고

$$
h
=

(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
$$

라고 하자.

그러면 사후밀도의 지수 부분은

$$
-\frac12
\left[
\mu^\top\bar M\mu
-
2\mu^\top h
+
C
\right]
$$

로 쓸 수 있다.

이제 $\mu$에 대한 완전제곱을 만든다. 일반적으로 대칭인 가역행렬 $A$와 벡터 $b$에 대하여

$$
x^\top Ax-2x^\top b
=
(x-A^{-1}b)^\top
A
(x-A^{-1}b)
-
b^\top A^{-1}b
$$

가 성립한다.

여기서

$$
A=\bar M,
\qquad
b=h
$$

로 두면

$$
\mu^\top\bar M\mu
-
2\mu^\top h
$$

$$
=
(\mu-\bar M^{-1}h)^\top
\bar M
(\mu-\bar M^{-1}h)
-
h^\top\bar M^{-1}h
$$

가 된다.

따라서 사후밀도는

$$
p(\mu\mid Q)
\propto
\exp\left[
-\frac12
(\mu-\bar M^{-1}h)^\top
\bar M
(\mu-\bar M^{-1}h)
\right]
$$

로 정리된다.

이는 평균이 $\bar M^{-1}h$이고, 공분산행렬이 $\bar M^{-1}$인 다변량 정규분포의 밀도 형태이다.

따라서

$$
\mu\mid Q
\sim
N(\bar M^{-1}h,\bar M^{-1})
$$

이다.

$\bar M$과 $h$의 정의를 다시 대입하면 사후평균은

$$
\bar\mu
=
\bar M^{-1}
\left[
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\right]
$$

이고,

$$
\bar M^{-1}
=
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]^{-1}
$$

이므로

$$
\boxed{
\bar\mu
=
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]^{-1}
\left[
(\tau\Sigma)^{-1}\Pi
+
P^\top\Omega^{-1}Q
\right]
}
$$

를 얻는다.

또한 사후공분산행렬은

$$
\boxed{
\bar M^{-1}
=
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]^{-1}
}
$$

이다.
</details>

시장균형 정보가 사후기대수익률에 기여하는 부분은

$$
(\tau\Sigma)^{-1}\Pi
$$

이다.

투자자의 전망이 기여하는 부분은

$$
P^\top\Omega^{-1}Q
$$

이다.

그리고 두 정보의 전체 정밀도는

$$
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
$$

이다.

이를 간단히 표현하면 다음과 같다.

$$
\text{사후기대수익률}
=
\text{시장균형과 투자자 전망의 정밀도 가중 결합}
$$

자산이 하나이고 전망도 하나인 경우를 생각하면 구조가 더 쉽게 보인다.

시장균형 기대수익률이 $\Pi$, 투자자의 전망이 $q$이고, 각각의 분산이 $\sigma_\Pi^2$, $\omega$라면 사후평균은

$$
\bar\mu
=
\frac{
\sigma_\Pi^{-2}\Pi
+
\omega^{-1}q
}{
\sigma_\Pi^{-2}
+
\omega^{-1}
}
$$

가 된다.

시장균형 정보의 정밀도가 높으면 결과는 $\Pi$에 가까워지고, 전망의 정밀도가 높으면 결과는 $q$에 가까워진다.

여러 자산에서는 단순한 숫자 대신 벡터와 행렬이 들어갈 뿐 기본적인 원리는 같다.

전망에 $P^\top$이 붙는 이유는 투자자의 전망이 개별 자산의 기대수익률이 아니라 견해 포트폴리오의 기대수익률로 주어졌기 때문이다.

예를 들어

$$
\mu_{\mathrm{Canada}}
-\mu_{\mathrm{USA}}
=
0.03
$$

이라는 전망은 캐나다와 미국의 기대수익률 차이에 대한 정보다.

이 정보를 개별 자산의 기대수익률 벡터로 다시 옮기는 역할을 하는 것이 $P^\top$이다.

## 3.5 사후공분산

시장균형과 투자자의 전망을 결합하면 수정된 기대수익률뿐만 아니라 그 기대수익률에 대한 불확실성도 함께 계산된다.

논문의 식 (9)은 다음과 같다.

$$
\bar M^{-1}
=
\left[
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
\right]^{-1}
$$

여기서 $\bar M^{-1}$은 자산수익률 자체의 공분산이 아니다.

$$
\Sigma
=
\text{실제 자산수익률의 공분산}
$$

이고,

$$
\bar M^{-1}
=
\text{기대수익률 추정의 공분산}
$$

이다.

두 개념은 구분해야 한다.

예를 들어 어떤 자산의 기대수익률을 정확히 알고 있다고 하더라도 실제 수익률은 계속 변할 수 있다. 이것이 $\Sigma$가 나타내는 위험이다.

반대로 실제 수익률의 변동성과 별개로 기대수익률 자체를 정확히 알지 못할 수도 있다. 이것이 $\bar M^{-1}$이 나타내는 불확실성이다.

전망이 추가되면 전체 정밀도는

$$
(\tau\Sigma)^{-1}
\quad\longrightarrow\quad
(\tau\Sigma)^{-1}
+
P^\top\Omega^{-1}P
$$

로 증가한다.

정밀도가 증가하면 그 역행렬인 사후공분산은 작아진다.

따라서 투자자의 전망은 기대수익률의 평균만 바꾸는 것이 아니다. 새로운 정보를 제공함으로써 기대수익률에 대한 불확실성도 줄인다.

다만 전망의 신뢰도가 매우 낮아 $\Omega$가 크다면 $\Omega^{-1}$은 작아진다. 이 경우 전망이 추가되더라도 사후공분산은 크게 줄어들지 않는다.

## 3.6 $\tau$와 $\Omega$가 결과에 미치는 영향

Black–Litterman 결과는 시장균형의 불확실성 $\tau\Sigma$와 전망의 불확실성 $\Omega$ 사이의 상대적인 크기에 따라 달라진다.

먼저 투자자의 전망에 대한 확신이 매우 낮다고 하자.

$$
\Omega\rightarrow\infty
$$

그러면

$$
\Omega^{-1}\rightarrow0
$$

이므로 투자자의 전망이 사후기대수익률에 미치는 영향은 거의 사라진다.

사후기대수익률 식에서 전망과 관련된 항을 제거하면

$$
\bar\mu\approx\Pi
$$

가 된다.

즉, 전망을 거의 믿지 않는다면 시장균형 기대수익률로 돌아간다.

반대로 전망에 대한 확신이 매우 높다면

$$
\Omega\rightarrow0
$$

이고,

$$
\Omega^{-1}\rightarrow\infty
$$

가 된다.

이 경우 사후기대수익률은 투자자의 전망을 거의 정확하게 만족한다.

$$
P\bar\mu\approx Q
$$

이번에는 $\tau$를 생각해보자.

$\tau$가 매우 작으면 시장균형 기대수익률을 강하게 신뢰한다.

$$
\tau\rightarrow0
\quad\Longrightarrow\quad
(\tau\Sigma)^{-1}\rightarrow\infty
$$

따라서 투자자의 전망이 들어와도 사후기대수익률은 $\Pi$에서 크게 벗어나지 않는다.

반대로 $\tau$가 커지면 시장균형 정보의 정밀도가 낮아지고 투자자의 전망이 상대적으로 더 큰 영향을 미친다.

중요한 것은 $\tau$와 $\Omega$를 따로 보는 것이 아니라 둘의 상대적인 크기를 보는 것이다.

시장균형의 불확실성이 작고 전망의 불확실성이 크면 시장균형이 강하게 반영된다.

$$
\tau\Sigma\text{ 작음},
\qquad
\Omega\text{ 큼}
$$

반대로 시장균형의 불확실성이 크고 전망의 불확실성이 작으면 투자자의 전망이 강하게 반영된다.

$$
\tau\Sigma\text{ 큼},
\qquad
\Omega\text{ 작음}
$$

투자자가 특정 자산들에 대해서만 전망을 제시하더라도 사후기대수익률은 다른 자산에서도 변할 수 있다.

자산들은 공분산행렬 $\Sigma$를 통해 연결되어 있기 때문이다.

예를 들어 캐나다가 미국보다 좋다는 전망을 넣으면 캐나다와 미국뿐 아니라 두 시장과 함께 움직이는 다른 국가의 기대수익률도 조정될 수 있다.

따라서 사후기대수익률 $\bar\mu$만 보고는 투자자의 전망이 최종 포트폴리오에 어떻게 반영되었는지 직관적으로 파악하기 어렵다.

다음 장에서는 $\bar\mu$를 포트폴리오 최적화에 넣고, 최종 투자비중을 직접 살펴본다. 여기서 Black–Litterman 포트폴리오가 시장 포트폴리오와 견해 포트폴리오의 조합으로 나타난다는 논문의 핵심 결과가 나온다.
